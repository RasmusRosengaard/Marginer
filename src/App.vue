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
    <RouterLink to="/" class="brand">Marginer</RouterLink>

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
  height: 56px;
  background: #16213e;
  border-bottom: 1px solid #0f3460;
}

.brand {
  font-size: 1.15rem;
  font-weight: 700;
  color: #e0e0e0;
  text-decoration: none;
  margin-right: 1.5rem;
  transition: color 0.15s;
  white-space: nowrap;
}

.brand:hover { color: #c8a94c; }

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
  padding: 0 1rem;
  height: 100%;
  color: #8899aa;
  text-decoration: none;
  font-size: 0.875rem;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.nav-profession:hover {
  color: #cde;
  border-bottom-color: #1e3a5f;
}

.nav-profession.router-link-active {
  color: #e0e0e0;
  border-bottom-color: #c8a94c;
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
  color: #6a7f99;
}

.region-select {
  background: #0d1b35;
  border: 1px solid #1e3a5f;
  border-radius: 4px;
  color: #e0e0e0;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.15s;
}

.region-select:hover { border-color: #1a5ba0; }

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  text-align: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid #0f3460;
  font-size: 0.825rem;
  color: #6a7f99;
}

.footer strong { color: #9fb4c7; }

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
