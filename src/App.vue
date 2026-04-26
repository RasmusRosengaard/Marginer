<script setup lang="ts">
import { useSettingsStore, REGIONS } from '@/stores/settings'
import { PROFESSIONS } from '@/config/professions'

const settings = useSettingsStore()
</script>

<template>
  <header
    v-motion
    :initial="{ opacity: 0, y: -20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    class="navbar"
  >
    <RouterLink to="/" class="brand">
      <img src="@/assets/logo.svg" alt="Margineer" class="brand-logo" />
    </RouterLink>

    <nav>
      <RouterLink
        v-for="profession in PROFESSIONS"
        :key="profession.slug"
        :to="`/${profession.slug}`"
        class="nav-profession"
      >
        <img :src="profession.icon" :alt="profession.name" class="nav-prof-icon" />
        {{ profession.name }}
      </RouterLink>
    </nav>

    <div class="navbar-right">
      <label class="region-label" for="region-select">Region</label>
      <select id="region-select" v-model="settings.region" class="region-select">
        <option v-for="r in REGIONS" :key="r.value" :value="r.value">{{ r.label }}</option>
      </select>
    </div>
  </header>

  <main class="container">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <footer
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 600, duration: 500 } }"
    class="footer"
  >
    <p>Want a recipe added? Contact <strong>rasmus5533</strong> on Discord.</p>
  </footer>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 2rem;
  height: 58px;
  background: rgba(10, 4, 22, 0.90);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(140, 65, 225, 0.35);
  box-shadow: 0 2px 24px rgba(80, 20, 160, 0.35);
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.brand-logo {
  height: 34px;
  width: auto;
  display: block;
  transition: filter 0.15s;
}

.brand:hover .brand-logo {
  filter: brightness(1.15) drop-shadow(0 0 6px rgba(168, 85, 247, 0.55));
}

nav {
  display: flex;
  align-items: stretch;
  height: 100%;
  flex: 1;
}

.nav-profession {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 0.9rem;
  height: 100%;
  color: #8878aa;
  text-decoration: none;
  font-size: 0.85rem;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, text-shadow 0.15s;
  white-space: nowrap;
}

.nav-profession:hover {
  color: #d4c4f0;
  border-bottom-color: rgba(160, 90, 255, 0.4);
}

.nav-profession.router-link-active {
  color: #ede5ff;
  border-bottom-color: #a855f7;
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.55);
}

.nav-prof-icon {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.region-label {
  font-size: 0.8rem;
  color: #7a6090;
}

.region-select {
  background: rgba(8, 3, 18, 0.8);
  border: 1px solid rgba(140, 65, 225, 0.4);
  border-radius: 6px;
  color: #d4c4f0;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.15s;
}

.region-select:hover { border-color: rgba(180, 100, 255, 0.65); }

.container {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  text-align: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(140, 65, 225, 0.2);
  font-size: 0.825rem;
  color: #7a6090;
}

.footer strong { color: #b8a0d0; }

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
