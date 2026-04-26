export type ItemQuality = 'silver' | 'gold'

export interface WowItem {
  id: number
  name: string
  quality?: ItemQuality
}

// Output
export const ARCANOWEAVE_BOLT: Record<ItemQuality, WowItem> = {
  silver: { id: 239198, name: 'Arcanoweave Bolt', quality: 'silver' },
  gold:   { id: 239200, name: 'Arcanoweave Bolt', quality: 'gold' }
}

// Reagents with quality tiers
export const ARCANOWEAVE: Record<ItemQuality, WowItem> = {
  silver: { id: 237018, name: 'Arcanoweave', quality: 'silver' },
  gold:   { id: 237017, name: 'Arcanoweave', quality: 'gold' }
}

export const IMBUED_BRIGHT_LINEN_BOLT: Record<ItemQuality, WowItem> = {
  silver: { id: 239702, name: 'Imbued Bright Linen Bolt', quality: 'silver' },
  gold:   { id: 239703, name: 'Imbued Bright Linen Bolt', quality: 'gold' }
}

// Reagents without quality tiers
export const MOTE_OF_WILD_MAGIC: WowItem = { id: 236951, name: 'Mote of Wild Magic' }

// All unique item IDs used by the Arcanoweave Bolt recipe (for bulk API calls)
export const ARCANOWEAVE_BOLT_ITEM_IDS = [
  ARCANOWEAVE_BOLT.silver.id,
  ARCANOWEAVE_BOLT.gold.id,
  ARCANOWEAVE.silver.id,
  ARCANOWEAVE.gold.id,
  IMBUED_BRIGHT_LINEN_BOLT.silver.id,
  IMBUED_BRIGHT_LINEN_BOLT.gold.id,
  MOTE_OF_WILD_MAGIC.id
]
