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

    <ul class="profession-grid">
      <li
        v-for="(profession, i) in PROFESSIONS"
        :key="profession.slug"
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 120 + i * 60, duration: 320 } }"
      >
        <RouterLink :to="`/${profession.slug}`" class="profession-card">
          <img :src="profession.icon" :alt="profession.name" class="profession-icon" />
          <span class="profession-name">{{ profession.name }}</span>
          <span class="profession-count">{{ profession.crafts.length }} recipe{{ profession.crafts.length !== 1 ? 's' : '' }}</span>
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
  color: #ede5ff;
}

.subtitle {
  font-size: 0.85rem;
  color: #7a6090;
}

.profession-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.profession-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.4rem 1rem 1.1rem;
  background: rgba(18, 8, 38, 0.78);
  border: 1px solid rgba(140, 65, 225, 0.32);
  border-radius: 12px;
  color: #d4c4f0;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}

.profession-card:hover {
  background: rgba(30, 12, 60, 0.88);
  border-color: rgba(168, 85, 247, 0.60);
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(120, 55, 200, 0.30);
}

.profession-icon {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgba(140, 65, 225, 0.45);
  box-shadow: 0 0 10px rgba(120, 55, 200, 0.20);
}

.profession-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ede5ff;
  text-align: center;
}

.profession-count {
  font-size: 0.72rem;
  color: #7a6090;
}
</style>
