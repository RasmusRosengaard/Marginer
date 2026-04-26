export type ItemQuality = 'silver' | 'gold'

export interface WowItem {
  id: number
  name: string
  quality?: ItemQuality
}

// ── Tailoring: Arcanoweave Bolt ──────────────────────────────────────────────

export const ARCANOWEAVE_BOLT: Record<ItemQuality, WowItem> = {
  silver: { id: 239198, name: 'Arcanoweave Bolt', quality: 'silver' },
  gold:   { id: 239200, name: 'Arcanoweave Bolt', quality: 'gold' }
}

export const ARCANOWEAVE: Record<ItemQuality, WowItem> = {
  silver: { id: 237018, name: 'Arcanoweave', quality: 'silver' },
  gold:   { id: 237017, name: 'Arcanoweave', quality: 'gold' }
}

export const IMBUED_BRIGHT_LINEN_BOLT: Record<ItemQuality, WowItem> = {
  silver: { id: 239702, name: 'Imbued Bright Linen Bolt', quality: 'silver' },
  gold:   { id: 239703, name: 'Imbued Bright Linen Bolt', quality: 'gold' }
}

export const MOTE_OF_WILD_MAGIC: WowItem = { id: 236951, name: 'Mote of Wild Magic' }

export const ARCANOWEAVE_BOLT_ITEM_IDS = [
  ARCANOWEAVE_BOLT.silver.id,
  ARCANOWEAVE_BOLT.gold.id,
  ARCANOWEAVE.silver.id,
  ARCANOWEAVE.gold.id,
  IMBUED_BRIGHT_LINEN_BOLT.silver.id,
  IMBUED_BRIGHT_LINEN_BOLT.gold.id,
  MOTE_OF_WILD_MAGIC.id
]

// ── Tailoring: Sunfire Silk Bolt ─────────────────────────────────────────────

export const SUNFIRE_SILK_BOLT: Record<ItemQuality, WowItem> = {
  silver: { id: 239201, name: 'Sunfire Silk Bolt', quality: 'silver' },
  gold:   { id: 239202, name: 'Sunfire Silk Bolt', quality: 'gold' }
}

export const SUNFIRE_SILK: Record<ItemQuality, WowItem> = {
  silver: { id: 237015, name: 'Sunfire Silk', quality: 'silver' },
  gold:   { id: 237016, name: 'Sunfire Silk', quality: 'gold' }
}

export const MOTE_OF_LIGHT: WowItem = { id: 236949, name: 'Mote of Light' }

export const SUNFIRE_SILK_BOLT_ITEM_IDS = [
  SUNFIRE_SILK_BOLT.silver.id,
  SUNFIRE_SILK_BOLT.gold.id,
  SUNFIRE_SILK.silver.id,
  SUNFIRE_SILK.gold.id,
  IMBUED_BRIGHT_LINEN_BOLT.silver.id,
  IMBUED_BRIGHT_LINEN_BOLT.gold.id,
  MOTE_OF_LIGHT.id
]

// ── Alchemy: Light's Potential ───────────────────────────────────────────────

export const LIGHTS_POTENTIAL: Record<ItemQuality, WowItem> = {
  silver: { id: 241309, name: "Light's Potential", quality: 'silver' },
  gold:   { id: 241308, name: "Light's Potential", quality: 'gold' }
}

export const TRANQUILITY_BLOOM: Record<ItemQuality, WowItem> = {
  silver: { id: 236761, name: 'Tranquility Bloom', quality: 'silver' },
  gold:   { id: 236767, name: 'Tranquility Bloom', quality: 'gold' }
}

export const AZEROOT: Record<ItemQuality, WowItem> = {
  silver: { id: 236774, name: 'Azeroot', quality: 'silver' },
  gold:   { id: 236775, name: 'Azeroot', quality: 'gold' }
}

export const ARGENTLEAF: Record<ItemQuality, WowItem> = {
  silver: { id: 236776, name: 'Argentleaf', quality: 'silver' },
  gold:   { id: 236777, name: 'Argentleaf', quality: 'gold' }
}

export const SUNGLASS_VIAL: Record<ItemQuality, WowItem> = {
  silver: { id: 240991, name: 'Sunglass Vial', quality: 'silver' },
  gold:   { id: 240990, name: 'Sunglass Vial', quality: 'gold' }
}

export const LIGHTS_POTENTIAL_ITEM_IDS = [
  LIGHTS_POTENTIAL.gold.id,
  LIGHTS_POTENTIAL.silver.id,
  TRANQUILITY_BLOOM.silver.id,
  TRANQUILITY_BLOOM.gold.id,
  AZEROOT.silver.id,
  AZEROOT.gold.id,
  ARGENTLEAF.silver.id,
  ARGENTLEAF.gold.id,
  SUNGLASS_VIAL.silver.id,
  SUNGLASS_VIAL.gold.id,
  MOTE_OF_LIGHT.id
]
