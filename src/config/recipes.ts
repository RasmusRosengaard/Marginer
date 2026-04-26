import {
  ARCANOWEAVE_BOLT,
  ARCANOWEAVE,
  IMBUED_BRIGHT_LINEN_BOLT,
  MOTE_OF_WILD_MAGIC,
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
    { item: ARCANOWEAVE,               quantity: 5, hasQuality: true },
    { item: IMBUED_BRIGHT_LINEN_BOLT,  quantity: 6, hasQuality: true },
    { item: MOTE_OF_WILD_MAGIC,        quantity: 4, hasQuality: false }
  ]
}
