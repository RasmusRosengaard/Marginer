import { useSettingsStore } from '@/stores/settings'

const BASE = '/api'

function region(): string {
  return useSettingsStore().region
}

export interface PricesResult {
  prices: Record<number, number>
  lastModified: string | null
}

export async function fetchPrices(itemIds: number[]): Promise<PricesResult> {
  if (!itemIds.length) return { prices: {}, lastModified: null }
  const res = await fetch(`${BASE}/prices?ids=${itemIds.join(',')}&region=${region()}`)
  if (!res.ok) throw new Error(`Price fetch failed: ${res.status}`)
  return res.json()
}

export async function fetchMedia(itemIds: number[]): Promise<Record<number, string>> {
  if (!itemIds.length) return {}
  const res = await fetch(`${BASE}/media?ids=${itemIds.join(',')}&region=${region()}`)
  if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
  return res.json()
}
