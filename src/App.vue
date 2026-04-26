<script setup lang="ts">
import { useSettingsStore, REGIONS, THEMES } from '@/stores/settings'
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
      <div class="theme-switcher">
        <button
          v-for="t in THEMES"
          :key="t.value"
          class="theme-btn"
          :class="{ active: settings.theme === t.value }"
          :title="t.label"
          @click="settings.theme = t.value"
        >
          <span class="theme-dot" :style="{ background: t.color }" />
        </button>
      </div>

      <div class="divider-v" />

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
  background: rgba(var(--surf-deep), 0.90);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(var(--a), 0.35);
  box-shadow: 0 2px 24px rgba(var(--a-dim), 0.35);
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
  filter: brightness(1.15) drop-shadow(0 0 6px rgba(var(--a-bright), 0.55));
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
  color: var(--nav-text);
  text-decoration: none;
  font-size: 0.85rem;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, text-shadow 0.15s;
  white-space: nowrap;
}

.nav-profession:hover {
  color: var(--text-2);
  border-bottom-color: rgba(var(--a-bright), 0.4);
}

.nav-profession.router-link-active {
  color: var(--text-1);
  border-bottom-color: var(--nav-active);
  text-shadow: 0 0 12px rgba(var(--a-bright), 0.55);
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

.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.theme-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: none;
  padding: 3px;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-btn:hover { border-color: rgba(255, 255, 255, 0.25); transform: scale(1.1); }
.theme-btn.active { border-color: rgba(255, 255, 255, 0.55); }

.theme-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.divider-v {
  width: 1px;
  height: 20px;
  background: rgba(var(--a), 0.30);
  margin: 0 0.25rem;
}

.region-label {
  font-size: 0.8rem;
  color: var(--text-4);
}

.region-select {
  background: rgba(var(--surf-deep), 0.8);
  border: 1px solid rgba(var(--a), 0.4);
  border-radius: 6px;
  color: var(--text-2);
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.15s;
}

.region-select:hover { border-color: rgba(var(--a-focus), 0.65); }

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
  border-top: 1px solid rgba(var(--a), 0.2);
  font-size: 0.825rem;
  color: var(--text-4);
}

.footer strong { color: var(--text-3); }

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
