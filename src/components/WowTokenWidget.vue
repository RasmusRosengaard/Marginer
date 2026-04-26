<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { fetchTokenPrice, fetchMedia } from '@/services/blizzardApi'

const WOW_TOKEN_ITEM_ID = 122284

const settings = useSettingsStore()
const price = ref<number | null>(null)
const icon = ref('')

async function load() {
  try {
    const [tokenData, mediaData] = await Promise.all([
      fetchTokenPrice(),
      icon.value ? Promise.resolve({} as Record<number, string>) : fetchMedia([WOW_TOKEN_ITEM_ID])
    ])
    price.value = tokenData.price
    if (mediaData[WOW_TOKEN_ITEM_ID]) icon.value = mediaData[WOW_TOKEN_ITEM_ID]
  } catch {
    price.value = null
  }
}

function goldOnly(copper: number): string {
  return Math.floor(copper / 10000).toLocaleString() + 'g'
}

onMounted(load)
watch(() => settings.region, load)
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 8 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 80, duration: 300 } }"
    class="token-pill"
  >
    <img v-if="icon" :src="icon" alt="WoW Token" class="token-icon" />
    <div v-else class="token-icon placeholder" />
    <span class="token-name">WoW Token</span>
    <span class="sep">·</span>
    <span class="token-price">{{ price !== null ? goldOnly(price) : '—' }}</span>
    <span class="token-region">{{ settings.region.toUpperCase() }}</span>
  </div>
</template>

<style scoped>
.token-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem 0.6rem 0.7rem;
  background: rgba(var(--surf-card), 0.72);
  border: 1px solid rgba(var(--a), 0.28);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  width: fit-content;
}

.token-icon {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid rgba(var(--a), 0.40);
  display: block;
  flex-shrink: 0;
}
.token-icon.placeholder {
  background: rgba(var(--a), 0.15);
}

.token-name {
  font-size: 0.8rem;
  color: var(--text-3);
  white-space: nowrap;
}

.sep {
  color: var(--text-4);
  font-size: 0.75rem;
}

.token-price {
  font-size: 0.875rem;
  font-weight: 700;
  color: #c8a94c;
  white-space: nowrap;
}

.token-region {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--accent);
  padding: 0.1rem 0.3rem;
  background: rgba(var(--a), 0.15);
  border-radius: 4px;
}
</style>
