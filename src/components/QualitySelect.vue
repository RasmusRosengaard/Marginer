<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ItemQuality } from '@/config/items'

const props = defineProps<{ modelValue: ItemQuality }>()
const emit = defineEmits<{ 'update:modelValue': [value: ItemQuality] }>()

const open = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const pos = ref({ top: 0, left: 0 })

const OPTIONS = [
  { value: 'silver' as ItemQuality, icon: '◆', color: '#c0c4cc' },
  { value: 'gold'   as ItemQuality, icon: '⬟', color: '#c8a94c' }
]

const current = computed(() => OPTIONS.find(o => o.value === props.modelValue)!)

function toggle() {
  if (!open.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    pos.value = { top: rect.bottom + 4, left: rect.left }
  }
  open.value = !open.value
}

function select(val: ItemQuality) {
  emit('update:modelValue', val)
  open.value = false
}
</script>

<template>
  <div class="qs-wrap">
    <button ref="triggerRef" type="button" class="qs-trigger" @click="toggle">
      <span :style="{ color: current.color }">{{ current.icon }}</span>
      <span class="qs-arrow">▾</span>
    </button>

    <Teleport to="body">
      <template v-if="open">
        <div class="qs-backdrop" @click="open = false" />
        <div class="qs-dropdown" :style="{ top: pos.top + 'px', left: pos.left + 'px' }">
          <button
            v-for="opt in OPTIONS"
            :key="opt.value"
            type="button"
            class="qs-option"
            :class="{ active: opt.value === modelValue }"
            @click="select(opt.value)"
          >
            <span :style="{ color: opt.color }">{{ opt.icon }}</span>
          </button>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<style scoped>
.qs-wrap {
  position: relative;
  display: inline-block;
}

.qs-trigger {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(18, 8, 38, 0.85);
  border: 1px solid rgba(140, 65, 225, 0.40);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  min-width: 56px;
  justify-content: space-between;
}

.qs-trigger:hover {
  border-color: rgba(168, 85, 247, 0.65);
  box-shadow: 0 0 8px rgba(120, 55, 200, 0.25);
}

.qs-arrow {
  color: #7a5fa0;
  font-size: 0.65rem;
  line-height: 1;
}
</style>

<style>
.qs-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

.qs-dropdown {
  position: fixed;
  background: rgba(14, 5, 30, 0.97);
  border: 1px solid rgba(140, 65, 225, 0.45);
  border-radius: 6px;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  z-index: 9999;
  min-width: 56px;
  box-shadow: 0 4px 20px rgba(80, 20, 160, 0.45);
  backdrop-filter: blur(12px);
}

.qs-option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.6rem;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.1s;
}

.qs-option:hover { background: rgba(140, 65, 225, 0.20); }
.qs-option.active { background: rgba(120, 50, 200, 0.30); }
</style>
