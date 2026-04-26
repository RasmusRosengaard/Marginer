<script setup lang="ts">
import { PROFESSIONS } from '@/config/professions'

const profession = PROFESSIONS.find((p) => p.slug === 'tailoring')!
</script>

<template>
  <div class="profession-page">
    <div
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 350 } }"
      class="profession-header"
    >
      <img :src="profession.icon" :alt="profession.name" class="profession-icon" />
      <div>
        <h2>{{ profession.name }}</h2>
        <p class="subtitle">Select a recipe to calculate its profit margin</p>
      </div>
    </div>

    <ul class="craft-list">
      <li
        v-for="(craft, i) in profession.crafts"
        :key="craft.slug"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 150 + i * 80, duration: 350 } }"
      >
        <RouterLink :to="`/tailoring/${craft.slug}`" class="craft-link">
          <img :src="craft.icon" :alt="craft.name" class="craft-icon" />
          <span class="craft-name">{{ craft.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.profession-page {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profession-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profession-icon {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgba(140, 65, 225, 0.50);
  box-shadow: 0 0 14px rgba(120, 55, 200, 0.30);
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  color: #ede5ff;
}

.subtitle {
  font-size: 0.85rem;
  color: #7a6090;
}

.craft-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 440px;
}

.craft-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  background: rgba(18, 8, 38, 0.78);
  border: 1px solid rgba(140, 65, 225, 0.32);
  border-radius: 10px;
  color: #d4c4f0;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}

.craft-link:hover {
  background: rgba(30, 12, 60, 0.88);
  border-color: rgba(168, 85, 247, 0.60);
  transform: translateX(4px);
  box-shadow: 0 0 18px rgba(120, 55, 200, 0.28);
}

.craft-icon {
  width: 38px;
  height: 38px;
  border-radius: 5px;
  border: 1px solid rgba(140, 65, 225, 0.45);
  flex-shrink: 0;
}

.craft-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #ede5ff;
}
</style>
