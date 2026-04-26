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
    name: 'Alchemy',
    slug: 'alchemy',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_alchemy.jpg',
    crafts: [
      {
        name: "Light's Potential",
        slug: 'lights-potential',
        icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_12_profession_alchemy_lightpotion_yellow.jpg'
      }
    ]
  },
  {
    name: 'Blacksmithing',
    slug: 'blacksmithing',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_blacksmithing.jpg',
    crafts: []
  },
  {
    name: 'Enchanting',
    slug: 'enchanting',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_engraving.jpg',
    crafts: []
  },
  {
    name: 'Engineering',
    slug: 'engineering',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_engineering.jpg',
    crafts: []
  },
  {
    name: 'Inscription',
    slug: 'inscription',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_inscription_tradeskill01.jpg',
    crafts: []
  },
  {
    name: 'Jewelcrafting',
    slug: 'jewelcrafting',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_misc_gem_01.jpg',
    crafts: []
  },
  {
    name: 'Leatherworking',
    slug: 'leatherworking',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_leatherworking.jpg',
    crafts: []
  },
  {
    name: 'Tailoring',
    slug: 'tailoring',
    icon: 'https://render.worldofwarcraft.com/eu/icons/56/trade_tailoring.jpg',
    crafts: [
      {
        name: 'Arcanoweave Bolt',
        slug: 'arcanoweave-bolt',
        icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_12_profession_tailoring_rareclothbolt_purple.jpg'
      },
      {
        name: 'Sunfire Silk Bolt',
        slug: 'sunfire-silk-bolt',
        icon: 'https://render.worldofwarcraft.com/eu/icons/56/inv_12_profession_tailoring_rareclothbolt_gold.jpg'
      }
    ]
  }
]
