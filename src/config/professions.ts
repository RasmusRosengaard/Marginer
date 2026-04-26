export interface CraftEntry {
  name: string
  slug: string
  icon: string
}

export interface ProfessionEntry {
  name: string
  slug: string
  icon: string
  crafts: CraftEntry[]
}

export const PROFESSIONS: ProfessionEntry[] = [
  {
    name: 'Tailoring',
    slug: 'tailoring',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_tailoring.jpg',
    crafts: [
      {
        name: 'Arcanoweave Bolt',
        slug: 'arcanoweave-bolt',
        icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_12_profession_tailoring_rareclothbolt_purple.jpg'
      }
    ]
  }
]
