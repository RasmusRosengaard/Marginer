<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useArcanoweaveStore } from '@/stores/arcanoweave'
import { useSettingsStore } from '@/stores/settings'
import { formatGold } from '@/utils/format'
import QualitySelect from '@/components/QualitySelect.vue'

const store = useArcanoweaveStore()
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

    <!-- Header -->
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
          alt="Arcanoweave Bolt"
        />
        <div>
          <h2>Arcanoweave Bolt</h2>
          <span class="last-updated" v-if="store.ahLastModified">
            AH updated {{ formatAhTime(store.ahLastModified) }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="store.error" class="error-banner">{{ store.error }}</div>

    <div class="calc-body" :class="{ dimmed: store.isLoading }">
      <div class="col-left">

      <!-- Craft Settings -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Craft Settings</h3>
        <div class="settings-grid">
          <div class="setting-group">
            <label>
              Output Quality
              <span class="info-icon">?
                <span class="info-tip">The quality tier of the item you plan to craft.<br><span class="q-silver">◆</span> Silver &nbsp;·&nbsp; <span class="q-gold">⬟</span> Gold<br>Spend Concentration while crafting to get Gold quality.</span>
              </span>
            </label>
            <QualitySelect v-model="store.outputQuality" />
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

      <!-- Specialization Bonuses -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Fiber Arts Specialization</h3>
        <div class="spec-grid">
          <div class="spec-group">
            <span class="spec-group-label">Creative Efficiency</span>
            <label class="checkbox-label">
              <input type="checkbox" v-model="store.creativeEfficiency1" />
              Tier 1 (0 KP) — +20% multicraft output
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="store.creativeEfficiency2" />
              Tier 2 (25 KP) — +20% multicraft output
            </label>
            <span class="spec-stat">
              Effective multiplier:
              <strong>{{ store.multicraftMultiplier.toFixed(2) }}×</strong>
              — max output per proc:
              <strong>{{ Math.floor(store.recipe.baseOutput * store.multicraftMultiplier) + store.recipe.baseOutput }}</strong>
              bolts
            </span>
          </div>
          <div class="spec-group">
            <span class="spec-group-label">Textile Utilization</span>
            <label class="checkbox-label">
              <input type="checkbox" v-model="store.textileUtilization1" />
              Tier 1 (0 KP) — extra reagent savings (TBD)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="store.textileUtilization2" />
              Tier 2 (25 KP) — extra reagent savings (TBD)
            </label>
            <span class="spec-stat footnote">Exact bonus not yet known — not applied to calculations.</span>
          </div>
        </div>
      </section>

      <!-- Reagents -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Reagents</h3>
        <div class="reagent-list">
          <div
            v-for="row in store.reagentRows"
            :key="row.idx"
            v-motion
            :initial="{ opacity: 0, x: -16 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 350 + row.idx * 80, duration: 300 } }"
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
              <QualitySelect v-if="row.hasQuality" v-model="store.reagentQualities[row.idx]" />
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

      </div><!-- /col-left -->
      <div class="col-right">

      <!-- Results -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 550, duration: 400 } }"
        class="card"
      >
        <h3 class="card-title">Results</h3>
        <div class="results-grid">
          <div class="result-row">
            <span class="result-label">Expected Output</span>
            <span class="result-value">
              {{ store.expectedOutput.toFixed(2) }} bolts
              <span class="result-sub">
                base {{ store.recipe.baseOutput }} + avg {{ store.multicraftAvgExtra.toFixed(1) }} extra on proc
              </span>
            </span>
          </div>
          <div class="result-row">
            <span class="result-label">Output Price</span>
            <span class="result-value">
              {{ formatGold(store.outputPrice) }}
              <span class="result-sub">per bolt ({{ store.outputQuality }})</span>
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
      </div><!-- /col-right -->

    </div>
  </div>
</template>

<style scoped>
.calculator { display: flex; flex-direction: column; gap: 1.25rem; }

.calc-header {
  display: flex; align-items: center;
  padding: 1rem 1.25rem;
  background: rgba(var(--surf-card), 0.82);
  border: 1px solid rgba(var(--a), 0.40);
  border-radius: 10px; backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(var(--a-dim), 0.30);
}
.header-left { display: flex; align-items: center; gap: 0.75rem; }
.header-left h2 { font-size: 1.25rem; margin-bottom: 0.15rem; color: var(--text-1); }
.last-updated { font-size: 0.75rem; color: var(--text-4); }
.item-icon-lg { width: 48px; height: 48px; border-radius: 6px; border: 1px solid rgba(var(--a), 0.45); box-shadow: 0 0 10px rgba(var(--a), 0.25); }

.error-banner {
  padding: 0.75rem 1rem; background: rgba(80, 10, 10, 0.7);
  border: 1px solid rgba(220, 60, 60, 0.5); border-radius: 8px;
  color: #fca5a5; font-size: 0.875rem;
}

.calc-body { display: grid; grid-template-columns: 1fr 320px; gap: 1.25rem; align-items: start; transition: opacity 0.2s; }
.calc-body.dimmed { opacity: 0.4; pointer-events: none; }
.col-left { display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }
.col-right { position: sticky; top: 1.5rem; }

.card {
  background: rgba(var(--surf-card), 0.82);
  border: 1px solid rgba(var(--a), 0.35);
  border-radius: 10px; padding: 1.25rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(var(--a-dim), 0.25);
}
.card-title {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.10em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 1rem;
}

.settings-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.setting-group { display: flex; flex-direction: column; gap: 0.4rem; }
.setting-group label { font-size: 0.8rem; color: var(--text-3); }

.info-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 13px; height: 13px; border-radius: 50%;
  background: rgba(var(--a), 0.30); color: var(--accent-light);
  font-size: 0.6rem; font-style: normal; cursor: default;
  position: relative; margin-left: 0.25rem; vertical-align: middle;
}
.info-tip {
  display: none; position: absolute; bottom: calc(100% + 6px);
  left: 50%; transform: translateX(-50%);
  background: rgba(var(--surf-overlay), 0.96);
  border: 1px solid rgba(var(--a), 0.5); border-radius: 8px;
  padding: 0.5rem 0.75rem; font-size: 0.75rem; color: var(--text-3);
  white-space: nowrap; z-index: 10; pointer-events: none;
  line-height: 1.6; font-weight: 400;
  box-shadow: 0 4px 16px rgba(var(--a-dim), 0.4);
}
.info-icon:hover .info-tip { display: block; }
.q-silver { color: #c0c4cc; }
.q-gold { color: #c8a94c; }

.setting-group select,
.setting-group input {
  background: rgba(var(--surf-deep), 0.8);
  border: 1px solid rgba(var(--a), 0.40); border-radius: 6px;
  color: var(--text-1); padding: 0.4rem 0.6rem;
  font-size: 0.9rem; min-width: 120px; transition: border-color 0.15s;
}
.setting-group select:hover,
.setting-group input:focus { border-color: rgba(var(--a-focus), 0.65); outline: none; }

.input-suffix {
  display: flex; align-items: center;
  background: rgba(var(--surf-deep), 0.8);
  border: 1px solid rgba(var(--a), 0.40);
  border-radius: 6px; overflow: hidden; transition: border-color 0.15s;
}
.input-suffix:focus-within { border-color: rgba(var(--a-focus), 0.65); }
.input-suffix input { border: none; background: transparent; min-width: 80px; color: var(--text-1); }
.input-suffix span { padding: 0 0.5rem; color: var(--text-4); font-size: 0.85rem; border-left: 1px solid rgba(var(--a), 0.3); }

.spec-grid { display: flex; gap: 2rem; flex-wrap: wrap; }
.spec-group { display: flex; flex-direction: column; gap: 0.5rem; }
.spec-group-label { font-size: 0.8rem; font-weight: 600; color: var(--text-2); }
.checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; color: var(--text-3); cursor: pointer; }
.checkbox-label input[type='checkbox'] { accent-color: var(--accent); width: 14px; height: 14px; }
.spec-stat { font-size: 0.775rem; color: var(--text-4); margin-top: 0.25rem; }
.spec-stat strong { color: #c8a94c; }
.footnote { font-size: 0.75rem; color: var(--text-4); }

.reagent-list { display: flex; flex-direction: column; gap: 0.6rem; }
.reagent-row {
  display: grid; grid-template-columns: 36px 1fr auto auto;
  align-items: center; gap: 0.75rem; padding: 0.65rem 0.85rem;
  background: rgba(var(--surf-deep), 0.75);
  border: 1px solid rgba(var(--a-mid), 0.30);
  border-radius: 8px; transition: border-color 0.15s, box-shadow 0.15s;
}
.reagent-row:hover {
  border-color: rgba(var(--a-bright), 0.50);
  box-shadow: 0 0 12px rgba(var(--a-mid), 0.20);
}
.item-icon-sm { width: 36px; height: 36px; border-radius: 4px; border: 1px solid rgba(var(--a), 0.40); }
.placeholder-icon { background: rgba(var(--a), 0.15); }
.reagent-info { display: flex; flex-direction: column; gap: 0.1rem; }
.reagent-name { font-size: 0.9rem; color: var(--text-1); }
.reagent-price-unit { font-size: 0.75rem; color: #c8a94c; }
.reagent-controls { display: flex; align-items: center; gap: 0.5rem; }
.reagent-qty { font-size: 0.85rem; color: var(--text-3); white-space: nowrap; }
.quality-none { color: var(--text-4); font-size: 0.8rem; min-width: 60px; text-align: center; }
.reagent-cost-col { display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem; min-width: 110px; }
.reagent-total { font-size: 0.9rem; color: #c8a94c; }
.reagent-saving { font-size: 0.75rem; color: #4ade80; }

.results-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.result-row { display: flex; justify-content: space-between; align-items: baseline; padding: 0.35rem 0; }
.result-label { font-size: 0.875rem; color: var(--text-3); }
.result-value { font-size: 0.9rem; color: var(--text-1); }
.result-sub { font-size: 0.75rem; color: var(--text-4); margin-left: 0.4rem; }
.divider { height: 1px; background: rgba(var(--a), 0.25); margin: 0.35rem 0; }
.result-highlight .result-label { font-size: 0.95rem; color: var(--text-2); font-weight: 600; }
.result-highlight .result-value { font-size: 1.1rem; font-weight: 700; }
.positive { color: #4ade80; }
.negative { color: #f87171; }
</style>
