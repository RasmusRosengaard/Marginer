import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tailoring',
      children: [
        {
          path: '',
          name: 'tailoring',
          component: () => import('@/views/tailoring/TailoringView.vue')
        },
        {
          path: 'arcanoweave-bolt',
          name: 'arcanoweave-bolt',
          component: () => import('@/views/ArcanoweaveView.vue')
        }
      ]
    }
  ]
})

export default router
