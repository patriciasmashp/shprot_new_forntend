import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MasterView from '../views/MasterView.vue'
import MobileDark from '@/layouts/MobileDark.vue'
import Favorites from '@/views/FavoritesView.vue'
import FiltersView from '@/views/FiltersView.vue'
import AuctionView from '@/views/AuctionView.vue'
import FeedView from '@/views/FeedView.vue'
import UploadForm from '@/views/UploadForm.vue'
import CityRegister from '@/views/CityRegister.vue'
import AuctionResponseView from '@/views/AuctionResponseView.vue'
import CreateAuctionView from '@/views/CreateAuctionView.vue'
import PuprpleLayout from '@/layouts/PuprpleLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: {
        filter: true
      },

      meta: {}
    },
    {
      path: '/',
      name: 'CityRegister',
      component: CityRegister,

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
      path: '/auction/:auctionId/:masterId',
      name: 'auctionMasterResponse',
      component: AuctionResponseView,
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
  {
    path: '/auction',
    name: 'auction',
    component: AuctionView,
    meta: {}
  },
  {
    path: '/createAuction',
    name: 'createAuction',
    component: CreateAuctionView,
    meta: {
      layout: PuprpleLayout
    }
  },
  {
    path: '/feed',
    name: 'feed',
    component: FeedView,
    meta: {}
  },
  {
    path: '/videoUpload',
    name: 'videoUpload',
    component: UploadForm,
    meta: {}
  },

  ],
})

export default router
