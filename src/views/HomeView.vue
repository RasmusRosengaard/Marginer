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
  color: #ede5ff;
}

.subtitle {
  font-size: 0.85rem;
  color: #7a6090;
}

.profession-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 440px;
}

.profession-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  background: rgba(18, 8, 38, 0.78);
  border: 1px solid rgba(140, 65, 225, 0.32);
  border-radius: 10px;
  color: #d4c4f0;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}

.profession-link:hover {
  background: rgba(30, 12, 60, 0.88);
  border-color: rgba(168, 85, 247, 0.60);
  transform: translateX(4px);
  box-shadow: 0 0 18px rgba(120, 55, 200, 0.28);
}

.profession-icon {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid rgba(140, 65, 225, 0.45);
  flex-shrink: 0;
}

.profession-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.profession-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ede5ff;
}

.profession-count {
  font-size: 0.75rem;
  color: #7a6090;
}
</style>
