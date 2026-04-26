<script setup lang="ts">
import { PROFESSIONS } from '@/config/professions'
</script>

<template>
  <div class="home">
    <div
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <h2>Professions</h2>
      <p class="subtitle">Choose a profession to see its crafts</p>
    </div>

    <ul class="profession-list">
      <li
        v-for="(profession, i) in PROFESSIONS"
        :key="profession.slug"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 150 + i * 80, duration: 350 } }"
      >
        <RouterLink :to="`/${profession.slug}`" class="profession-link">
          <img :src="profession.icon" :alt="profession.name" class="profession-icon" />
          <div class="profession-info">
            <span class="profession-name">{{ profession.name }}</span>
            <span class="profession-count">{{ profession.crafts.length }} recipe{{ profession.crafts.length !== 1 ? 's' : '' }}</span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: 0.85rem;
  color: #6a7f99;
}

.profession-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 420px;
}

.profession-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  background: #16213e;
  border: 1px solid #0f3460;
  border-radius: 8px;
  color: #e0e0e0;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s, transform 0.15s;
}

.profession-link:hover {
  background: #0f3460;
  border-color: #1a5ba0;
  transform: translateX(4px);
}

.profession-icon {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  border: 1px solid #1e3a5f;
  flex-shrink: 0;
}

.profession-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.profession-name {
  font-size: 0.95rem;
  font-weight: 500;
}

.profession-count {
  font-size: 0.75rem;
  color: #6a7f99;
}
</style>
