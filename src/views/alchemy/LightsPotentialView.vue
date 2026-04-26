<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useLightsPotentialStore } from '@/stores/lightspotential'
import { useSettingsStore } from '@/stores/settings'
import { formatGold } from '@/utils/format'

const store = useLightsPotentialStore()
const settings = useSettingsStore()

onMounted(() => store.loadMarketData())
watch(() => settings.region, () => store.loadMarketData())

function formatAhTime(lastModified: string): string {
  return new Date(lastModified).toLocaleString([], {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <div class="calculator">

    <div
      v-motion
      :initial="{ opacity: 0, y: -12 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 350 } }"
      class="calc-header"
    >
      <div class="header-left">
        <img
          v-if="store.icons[store.outputItem.id]"
          :src="store.icons[store.outputItem.id]"
          class="item-icon-lg"
          alt="Light's Potential"
        />
        <div>
          <h2>Light's Potential</h2>
          <span class="last-updated" v-if="store.ahLastModified">
            AH updated {{ formatAhTime(store.ahLastModified) }}
          </span>
        </div>
      </div>
      <button class="btn-refresh" @click="store.loadMarketData()" :disabled="store.isLoading">
        {{ store.isLoading ? 'Loading…' : '↻ Refresh Prices' }}
      </button>
    </div>

    <div v-if="store.error" class="error-banner">{{ store.error }}</div>

    <div class="calc-body" :class="{ dimmed: store.isLoading }">

      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Craft Settings</h3>
        <div class="settings-grid">
          <div class="setting-group">
            <label>Output Quality</label>
            <select v-model="store.outputQuality">
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Multicraft %</label>
            <div class="input-suffix">
              <input type="number" v-model.number="store.multicraftChance" min="0" max="100" step="0.1" />
              <span>%</span>
            </div>
          </div>
          <div class="setting-group">
            <label>Resourcefulness %</label>
            <div class="input-suffix">
              <input type="number" v-model.number="store.resourcefulnessChance" min="0" max="100" step="0.1" />
              <span>%</span>
            </div>
          </div>
        </div>
      </section>

      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Reagents</h3>
        <div class="reagent-list">
          <div
            v-for="row in store.reagentRows"
            :key="row.idx"
            v-motion
            :initial="{ opacity: 0, x: -16 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 250 + row.idx * 80, duration: 300 } }"
            class="reagent-row"
          >
            <img v-if="row.icon" :src="row.icon" :alt="row.itemName" class="item-icon-sm" />
            <div v-else class="item-icon-sm placeholder-icon" />

            <div class="reagent-info">
              <span class="reagent-name">{{ row.itemName }}</span>
              <span class="reagent-price-unit">{{ formatGold(row.pricePerUnit) }} each</span>
            </div>

            <div class="reagent-controls">
              <span class="reagent-qty">× {{ row.quantity }}</span>
              <select v-if="row.hasQuality" v-model="store.reagentQualities[row.idx]" class="quality-select">
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
              <span v-else class="quality-none">—</span>
            </div>

            <div class="reagent-cost-col">
              <span class="reagent-total">{{ formatGold(row.totalCost) }}</span>
              <span v-if="store.resourcefulnessChance > 0" class="reagent-saving">
                −{{ formatGold(row.expectedSaving) }} avg
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Results</h3>
        <div class="results-grid">
          <div class="result-row">
            <span class="result-label">Expected Output</span>
            <span class="result-value">
              {{ store.expectedOutput.toFixed(2) }} potions
              <span class="result-sub">
                base {{ store.recipe.baseOutput }} + avg {{ store.multicraftAvgExtra.toFixed(1) }} extra on proc
              </span>
            </span>
          </div>
          <div class="result-row">
            <span class="result-label">Output Price</span>
            <span class="result-value">
              {{ formatGold(store.outputPrice) }}
              <span class="result-sub">per potion ({{ store.outputQuality }})</span>
            </span>
          </div>
          <div class="result-row">
            <span class="result-label">Reagent Cost</span>
            <span class="result-value">{{ formatGold(store.totalCost) }}</span>
          </div>
          <div class="result-row">
            <span class="result-label">Revenue</span>
            <span class="result-value">{{ formatGold(store.revenue) }}</span>
          </div>
          <div v-if="store.resourcefulnessChance > 0" class="result-row">
            <span class="result-label">Resourcefulness Bonus</span>
            <span class="result-value positive">+{{ formatGold(store.totalResourcefulnessProfit) }} avg</span>
          </div>
          <div class="divider" />
          <div class="result-row result-highlight">
            <span class="result-label">Profit</span>
            <span class="result-value" :class="store.profit >= 0 ? 'positive' : 'negative'">
              {{ store.profit >= 0 ? '+' : '' }}{{ formatGold(store.profit) }}
            </span>
          </div>
          <div class="result-row result-highlight">
            <span class="result-label">Margin</span>
            <span class="result-value" :class="store.margin >= 0 ? 'positive' : 'negative'">
              {{ store.margin >= 0 ? '+' : '' }}{{ store.margin.toFixed(1) }}%
            </span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.calc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #16213e;
  border: 1px solid #0f3460;
  border-radius: 8px;
}
.header-left { display: flex; align-items: center; gap: 0.75rem; }
.header-left h2 { font-size: 1.25rem; margin-bottom: 0.15rem; }
.last-updated { font-size: 0.75rem; color: #6a7f99; }
.item-icon-lg { width: 48px; height: 48px; border-radius: 4px; border: 1px solid #0f3460; }

.btn-refresh {
  padding: 0.5rem 1rem;
  background: #0f3460;
  border: 1px solid #1a5ba0;
  border-radius: 6px;
  color: #cde;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.15s;
}
.btn-refresh:hover:not(:disabled) { background: #1a5ba0; }
.btn-refresh:disabled { opacity: 0.5; cursor: default; }

.error-banner {
  padding: 0.75rem 1rem;
  background: #3d1414;
  border: 1px solid #7a2020;
  border-radius: 6px;
  color: #f88;
  font-size: 0.875rem;
}

.calc-body { display: flex; flex-direction: column; gap: 1.25rem; transition: opacity 0.2s; }
.calc-body.dimmed { opacity: 0.5; pointer-events: none; }

.card { background: #16213e; border: 1px solid #0f3460; border-radius: 8px; padding: 1.25rem; }
.card-title {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: #6a7f99; margin-bottom: 1rem;
}

.settings-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.setting-group { display: flex; flex-direction: column; gap: 0.4rem; }
.setting-group label { font-size: 0.8rem; color: #8899aa; }
.setting-group select,
.setting-group input {
  background: #0d1b35; border: 1px solid #1e3a5f; border-radius: 4px;
  color: #e0e0e0; padding: 0.4rem 0.6rem; font-size: 0.9rem; min-width: 120px;
}
.input-suffix {
  display: flex; align-items: center; background: #0d1b35;
  border: 1px solid #1e3a5f; border-radius: 4px; overflow: hidden;
}
.input-suffix input { border: none; background: transparent; min-width: 80px; }
.input-suffix span { padding: 0 0.5rem; color: #6a7f99; font-size: 0.85rem; border-left: 1px solid #1e3a5f; }

.reagent-list { display: flex; flex-direction: column; gap: 0.75rem; }
.reagent-row {
  display: grid;
  grid-template-columns: 36px 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: #0d1b35;
  border: 1px solid #1e3a5f;
  border-radius: 6px;
}
.item-icon-sm { width: 36px; height: 36px; border-radius: 3px; border: 1px solid #1e3a5f; }
.placeholder-icon { background: #1e3a5f; }
.reagent-info { display: flex; flex-direction: column; gap: 0.1rem; }
.reagent-name { font-size: 0.9rem; color: #cde; }
.reagent-price-unit { font-size: 0.75rem; color: #c8a94c; }
.reagent-controls { display: flex; align-items: center; gap: 0.5rem; }
.reagent-qty { font-size: 0.85rem; color: #8899aa; white-space: nowrap; }
.quality-select {
  background: #0d1b35; border: 1px solid #1e3a5f; border-radius: 4px;
  color: #e0e0e0; padding: 0.25rem 0.4rem; font-size: 0.8rem;
}
.quality-none { color: #4a5a6a; font-size: 0.8rem; min-width: 60px; text-align: center; }
.reagent-cost-col { display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem; min-width: 110px; }
.reagent-total { font-size: 0.9rem; color: #c8a94c; }
.reagent-saving { font-size: 0.75rem; color: #5cba6a; }

.results-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.result-row { display: flex; justify-content: space-between; align-items: baseline; padding: 0.35rem 0; }
.result-label { font-size: 0.875rem; color: #8899aa; }
.result-value { font-size: 0.9rem; color: #cde; }
.result-sub { font-size: 0.75rem; color: #6a7f99; margin-left: 0.4rem; }
.divider { height: 1px; background: #1e3a5f; margin: 0.25rem 0; }
.result-highlight .result-label { font-size: 0.95rem; color: #aabbcc; font-weight: 600; }
.result-highlight .result-value { font-size: 1.05rem; font-weight: 700; }
.positive { color: #5cba6a; }
.negative { color: #e05555; }
</style>
