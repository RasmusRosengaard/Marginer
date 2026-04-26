import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Region = 'eu' | 'us' | 'kr' | 'tw'

export const REGIONS: { value: Region; label: string }[] = [
  { value: 'eu', label: 'EU' },
  { value: 'us', label: 'US' },
  { value: 'kr', label: 'KR' },
  { value: 'tw', label: 'TW' }
]

export const useSettingsStore = defineStore('settings', () => {
  const region = ref<Region>((localStorage.getItem('wow-region') as Region) ?? 'eu')

  watch(region, (r) => localStorage.setItem('wow-region', r))

  return { region }
})
