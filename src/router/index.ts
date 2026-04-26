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
      path: '/alchemy',
      children: [
        {
          path: '',
          name: 'alchemy',
          component: () => import('@/views/ProfessionView.vue')
        },
        {
          path: 'lights-potential',
          name: 'lights-potential',
          component: () => import('@/views/alchemy/LightsPotentialView.vue')
        }
      ]
    },
    {
      path: '/blacksmithing',
      name: 'blacksmithing',
      component: () => import('@/views/ProfessionView.vue')
    },
    {
      path: '/enchanting',
      name: 'enchanting',
      component: () => import('@/views/ProfessionView.vue')
    },
    {
      path: '/engineering',
      name: 'engineering',
      component: () => import('@/views/ProfessionView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/views/ProfessionView.vue')
    },
    {
      path: '/jewelcrafting',
      name: 'jewelcrafting',
      component: () => import('@/views/ProfessionView.vue')
    },
    {
      path: '/leatherworking',
      name: 'leatherworking',
      component: () => import('@/views/ProfessionView.vue')
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
        },
        {
          path: 'sunfire-silk-bolt',
          name: 'sunfire-silk-bolt',
          component: () => import('@/views/tailoring/SunfireSilkBoltView.vue')
        }
      ]
    }
  ]
})

export default router
