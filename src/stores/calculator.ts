import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalculatorStore = defineStore('calculator', () => {
  const multicraftChance = ref(0)
  const resourcefulnessChance = ref(0)

  const baseOutput = ref(2)

  const expectedOutput = computed(() => {
    const avgExtra = multicraftChance.value / 100 * (baseOutput.value * 1.75)
    return baseOutput.value + avgExtra
  })

  return {
    multicraftChance,
    resourcefulnessChance,
    baseOutput,
    expectedOutput
  }
})
