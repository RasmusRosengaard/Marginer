import {
  ARCANOWEAVE_BOLT, ARCANOWEAVE, IMBUED_BRIGHT_LINEN_BOLT, MOTE_OF_WILD_MAGIC,
  SUNFIRE_SILK_BOLT, SUNFIRE_SILK, MOTE_OF_LIGHT,
  LIGHTS_POTENTIAL, TRANQUILITY_BLOOM, AZEROOT, ARGENTLEAF, SUNGLASS_VIAL,
  type ItemQuality,
  type WowItem
} from './items'

export interface Reagent {
  item: WowItem | Record<ItemQuality, WowItem>
  quantity: number
  hasQuality: boolean
}

export interface Recipe {
  name: string
  output: Record<ItemQuality, WowItem>
  baseOutput: number
  reagents: Reagent[]
}

export const ARCANOWEAVE_BOLT_RECIPE: Recipe = {
  name: 'Arcanoweave Bolt',
  output: ARCANOWEAVE_BOLT,
  baseOutput: 2,
  reagents: [
    { item: ARCANOWEAVE,              quantity: 5, hasQuality: true },
    { item: IMBUED_BRIGHT_LINEN_BOLT, quantity: 6, hasQuality: true },
    { item: MOTE_OF_WILD_MAGIC,       quantity: 4, hasQuality: false }
  ]
}

export const SUNFIRE_SILK_BOLT_RECIPE: Recipe = {
  name: 'Sunfire Silk Bolt',
  output: SUNFIRE_SILK_BOLT,
  baseOutput: 2,
  reagents: [
    { item: SUNFIRE_SILK,             quantity: 5, hasQuality: true },
    { item: IMBUED_BRIGHT_LINEN_BOLT, quantity: 5, hasQuality: true },
    { item: MOTE_OF_LIGHT,            quantity: 4, hasQuality: false }
  ]
}

export const LIGHTS_POTENTIAL_RECIPE: Recipe = {
  name: "Light's Potential",
  output: LIGHTS_POTENTIAL,
  baseOutput: 5,
  reagents: [
    { item: TRANQUILITY_BLOOM, quantity: 8, hasQuality: true },
    { item: AZEROOT,           quantity: 3, hasQuality: true },
    { item: ARGENTLEAF,        quantity: 3, hasQuality: true },
    { item: SUNGLASS_VIAL,     quantity: 5, hasQuality: true },
    { item: MOTE_OF_LIGHT,     quantity: 1, hasQuality: false }
  ]
}
