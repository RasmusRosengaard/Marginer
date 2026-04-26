import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Region = 'eu' | 'us' | 'kr' | 'tw'
export type Theme = 'midnight' | 'pandaria'

export const REGIONS: { value: Region; label: string }[] = [
  { value: 'eu', label: 'EU' },
  { value: 'us', label: 'US' },
  { value: 'kr', label: 'KR' },
  { value: 'tw', label: 'TW' }
]

export const THEMES: { value: Theme; label: string; color: string }[] = [
  { value: 'midnight', label: 'Midnight', color: '#a855f7' },
  { value: 'pandaria', label: 'Pandaria', color: '#22c55e' }
]

function applyTheme(t: Theme) {
  if (t === 'midnight') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.dataset.theme = t
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const region = ref<Region>((localStorage.getItem('wow-region') as Region) ?? 'eu')
  const theme = ref<Theme>((localStorage.getItem('wow-theme') as Theme) ?? 'midnight')

  applyTheme(theme.value)

  watch(region, (r) => localStorage.setItem('wow-region', r))
  watch(theme, (t) => {
    applyTheme(t)
    localStorage.setItem('wow-theme', t)
  })

  return { region, theme }
})
