import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const CLIENT_ID = process.env.BLIZZARD_CLIENT_ID || ''
const CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET || ''
const DEFAULT_REGION = (process.env.BLIZZARD_REGION || 'eu').toLowerCase()

// --- Token ---

let tokenCache: { value: string; expiresAt: number } | null = null

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.value

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch('https://oauth.battle.net/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  if (!res.ok) throw new Error(`Token fetch failed: ${res.status} ${await res.text()}`)

  const data = (await res.json()) as { access_token: string; expires_in: number }
  tokenCache = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return tokenCache.value
}

// --- Commodity prices (cached per region, 15 min) ---

type CommodityAuction = { item: { id: number }; unit_price: number }

interface RegionPriceCache {
  prices: Record<number, number>
  lastModified: string | null
  expiresAt: number
}

const commodityCaches: Record<string, RegionPriceCache> = {}

async function getCommodityPrices(region: string): Promise<RegionPriceCache> {
  const cached = commodityCaches[region]
  if (cached && Date.now() < cached.expiresAt) return cached

  const token = await getToken()
  const res = await fetch(
    `https://${region}.api.blizzard.com/data/wow/auctions/commodities?namespace=dynamic-${region}&locale=en_US`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!res.ok) throw new Error(`AH fetch failed: ${res.status}`)

  const lastModified = res.headers.get('Last-Modified')
  const data = (await res.json()) as { auctions: CommodityAuction[] }

  const prices: Record<number, number> = {}
  for (const a of data.auctions) {
    const id = a.item.id
    if (prices[id] === undefined || a.unit_price < prices[id]) prices[id] = a.unit_price
  }

  const entry: RegionPriceCache = { prices, lastModified, expiresAt: Date.now() + 15 * 60 * 1000 }
  commodityCaches[region] = entry
  return entry
}

// --- Item media (cached per region) ---

const mediaCaches: Record<string, Record<number, string>> = {}

async function getItemMedia(itemId: number, region: string): Promise<string> {
  if (!mediaCaches[region]) mediaCaches[region] = {}
  if (mediaCaches[region][itemId]) return mediaCaches[region][itemId]

  const token = await getToken()
  const res = await fetch(
    `https://${region}.api.blizzard.com/data/wow/media/item/${itemId}?namespace=static-${region}&locale=en_US`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!res.ok) return ''

  const data = (await res.json()) as { assets: { key: string; value: string }[] }
  const icon = data.assets.find((a) => a.key === 'icon')?.value ?? ''
  mediaCaches[region][itemId] = icon
  return icon
}

// --- WoW Token price (cached per region, 15 min) ---

const tokenPriceCaches: Record<string, { price: number; lastUpdated: number; expiresAt: number }> = {}

async function getTokenPrice(region: string): Promise<{ price: number; lastUpdated: number }> {
  const cached = tokenPriceCaches[region]
  if (cached && Date.now() < cached.expiresAt) return cached

  const token = await getToken()
  const res = await fetch(
    `https://${region}.api.blizzard.com/data/wow/token/index?namespace=dynamic-${region}&locale=en_US`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!res.ok) throw new Error(`Token price fetch failed: ${res.status}`)

  const data = (await res.json()) as { price: number; last_updated_timestamp: number }
  const entry = { price: data.price, lastUpdated: data.last_updated_timestamp, expiresAt: Date.now() + 15 * 60 * 1000 }
  tokenPriceCaches[region] = entry
  return entry
}

// --- Routes ---

app.get('/api/prices', async (req, res) => {
  const region = String(req.query.region || DEFAULT_REGION).toLowerCase()
  const ids = String(req.query.ids ?? '').split(',').map(Number).filter(Boolean)
  if (!ids.length) return void res.json({ prices: {}, lastModified: null })

  try {
    const { prices, lastModified } = await getCommodityPrices(region)
    const result: Record<number, number> = {}
    for (const id of ids) if (prices[id] !== undefined) result[id] = prices[id]
    // Tell Vercel CDN to cache for 15 min, serve stale while revalidating
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=60')
    res.json({ prices: result, lastModified })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to fetch prices' })
  }
})

app.get('/api/media', async (req, res) => {
  const region = String(req.query.region || DEFAULT_REGION).toLowerCase()
  const ids = String(req.query.ids ?? '').split(',').map(Number).filter(Boolean)
  if (!ids.length) return void res.json({})

  try {
    const result: Record<number, string> = {}
    await Promise.all(ids.map(async (id) => (result[id] = await getItemMedia(id, region))))
    // Icons never change — cache aggressively
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to fetch media' })
  }
})

app.get('/api/token', async (req, res) => {
  const region = String(req.query.region || DEFAULT_REGION).toLowerCase()
  try {
    const { price, lastUpdated } = await getTokenPrice(region)
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=60')
    res.json({ price, lastUpdated })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to fetch token price' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true, defaultRegion: DEFAULT_REGION }))

export default app
