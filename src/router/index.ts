import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MasterView from '../views/MasterView.vue'
import MobileDark from '@/layouts/MobileDark.vue'
import Favorites from '@/views/FavoritesView.vue'
import FiltersView from '@/views/FiltersView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {}
    },
    {
      path: '/:id',
      name: 'masterView',
      component: MasterView,
      meta: {
        layout: MobileDark
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: {}
    },
    {
      path: '/filters',
      name: 'filters',
      component: FiltersView,
      meta: {}
    },
  ],
})

export default router
