import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchPrices, fetchMedia } from '@/services/blizzardApi'
import { LIGHTS_POTENTIAL_RECIPE } from '@/config/recipes'
import { LIGHTS_POTENTIAL_ITEM_IDS } from '@/config/items'
import type { ItemQuality, WowItem } from '@/config/items'

const RESOURCEFULNESS_SAVE_RATIO = 0.30

export const useLightsPotentialStore = defineStore('lightspotential', () => {
  const outputQuality = ref<ItemQuality>('silver')
  const multicraftChance = ref(0)
  const resourcefulnessChance = ref(0)
  const reagentQualities = ref<Record<number, ItemQuality>>({
    0: 'silver', 1: 'silver', 2: 'silver', 3: 'silver'
  })

  const prices = ref<Record<number, number>>({})
  const icons = ref<Record<number, string>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const ahLastModified = ref<string | null>(null)

  const recipe = LIGHTS_POTENTIAL_RECIPE

  async function loadMarketData() {
    isLoading.value = true
    error.value = null
    try {
      const [priceResult, mediaData] = await Promise.all([
        fetchPrices(LIGHTS_POTENTIAL_ITEM_IDS),
        fetchMedia(LIGHTS_POTENTIAL_ITEM_IDS)
      ])
      prices.value = priceResult.prices
      icons.value = mediaData
      ahLastModified.value = priceResult.lastModified
    } catch {
      error.value = 'Failed to load market data. Is the server running?'
    } finally {
      isLoading.value = false
    }
  }

  const multicraftMultiplier = computed(() => 2.5)

  const multicraftAvgExtra = computed(() => {
    const maxExtra = Math.floor(recipe.baseOutput * multicraftMultiplier.value)
    return (1 + maxExtra) / 2
  })

  const expectedOutput = computed(() =>
    recipe.baseOutput + (multicraftChance.value / 100) * multicraftAvgExtra.value
  )

  const outputItem = computed(() => recipe.output[outputQuality.value])
  const outputPrice = computed(() => prices.value[outputItem.value.id] ?? 0)

  const reagentRows = computed(() =>
    recipe.reagents.map((reagent, idx) => {
      let itemId: number
      let itemName: string

      if (reagent.hasQuality) {
        const q = reagentQualities.value[idx] ?? 'silver'
        const qualityMap = reagent.item as Record<ItemQuality, WowItem>
        itemId = qualityMap[q].id
        itemName = qualityMap[q].name
      } else {
        const item = reagent.item as WowItem
        itemId = item.id
        itemName = item.name
      }

      const pricePerUnit = prices.value[itemId] ?? 0
      const totalCost = pricePerUnit * reagent.quantity
      const savedUnits = Math.floor(reagent.quantity * RESOURCEFULNESS_SAVE_RATIO)
      const expectedSaving = (resourcefulnessChance.value / 100) * savedUnits * pricePerUnit

      return { idx, itemId, itemName, icon: icons.value[itemId] ?? '', quantity: reagent.quantity, hasQuality: reagent.hasQuality, pricePerUnit, totalCost, savedUnits, expectedSaving }
    })
  )

  const totalCost = computed(() => reagentRows.value.reduce((s, r) => s + r.totalCost, 0))
  const totalResourcefulnessProfit = computed(() => reagentRows.value.reduce((s, r) => s + r.expectedSaving, 0))
  const revenue = computed(() => expectedOutput.value * outputPrice.value)
  const profit = computed(() => revenue.value - totalCost.value + totalResourcefulnessProfit.value)
  const margin = computed(() => (revenue.value > 0 ? (profit.value / revenue.value) * 100 : 0))

  return {
    outputQuality, multicraftChance, resourcefulnessChance, reagentQualities,
    prices, icons, isLoading, error, ahLastModified,
    loadMarketData, recipe,
    multicraftMultiplier, multicraftAvgExtra, expectedOutput,
    outputItem, outputPrice, reagentRows,
    totalCost, totalResourcefulnessProfit, revenue, profit, margin
  }
})
