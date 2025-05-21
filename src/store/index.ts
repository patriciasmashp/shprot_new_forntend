import { createStore } from 'vuex'
import { master } from './modules/master'
import { filter } from './modules/filters'
import { getCities, getClient, getStyles, updateClient } from '@/api'
import type { Master } from '@/types/Master'
import { SignedClient } from '@/utils/classes/SignedClient'
import { UnsignedClient } from '@/utils/classes/UnsignedClient'
import type { UserInteract } from '@/types/UserInteract'
import ProxySignedClient from '@/utils/classes/ProxySignedClient'
import auctions from './modules/auctions'

export const store = createStore({
  state() {
    return {
      city: undefined,
      client: null,
      cities: [],
      styles: []
    }
  },
  mutations: {
    setCity(state, city) {
      state.city = city
    },
    setClient(state, client) {
      state.client = client
    },
    setCities(state, cities) {
      state.cities = cities
    },
    setStyles(state, styles) {
      state.styles = styles
    },
    deleteFavorite(state, data) {
      const client = state.client.client;
      const favorites = client.favorites_by_date;
      var favToday = favorites.find((el) => el.date === data.date);

      if (favToday) {
        favToday.masters = favToday.masters.filter((master) => master.documentId !== data.master.documentId);
        if (favToday.masters.length === 0) {
          favorites.splice(favorites.indexOf(favToday), 1);
        }

      }
    }
  },
  actions: {
    SET_CITY(context, city) {
      context.commit('setCity', city)
    },
    async FETCH_CITIES(context) {
      const cities = await getCities()
      context.commit('setCities', cities)
    },
    async FETCH_STYLES(context) {
      const styles = await getStyles()

      context.commit('setStyles', styles)
    },
    async FETCH_CLIENT(context, client_id: number | null = null) {
      if (window.Telegram.WebApp.initData) {
        client_id = window.Telegram.WebApp.initDataUnsafe.user.id as number
      }
      let client = null

      if (!client_id) {
        client = new UnsignedClient()
        await client.init()
      }
      else {
        const clientData = await getClient(client_id)
        client = new ProxySignedClient(clientData)

      }
      context.commit('setClient', client)
    },
    async ADD_FAVORITE(context, data) {
      const client: UserInteract = context.getters.client;
      if (!client.is_signed()) return

      const favorites = client.getFavorites();
      var favToday = favorites.find((el) => el.date === data.date);

      if (!favToday) {
        if (favorites.some((el) => el.masters.some((master) => master.documentId == data.master.documentId))) return
        favToday = {
          date: data.date,
          masters: [data.master]
        }
        favorites.push(favToday);
      } else {
        if (favToday.masters.find((master) => master.documentId == data.master.documentId)) return
        favToday.masters.push(data.master);
      }
      context.commit('setClient', client);
      // context.dispatch('likeMaster', data.master);      

      await updateClient(client.client.documentId, client);

      // context.commit('addFavorite', favorite)
    },
    async DELETE_FAVORITE(context, masterToDelete) {
      context.commit('deleteFavorite', masterToDelete)
      const client = context.getters.client;
      await updateClient(client.client.documentId, client);
    },

    async CLEAR_FAVORITES(context) {
      const client = context.getters.client;
      client.client.favorites_by_date = [];
      context.commit('setClient', client);
      await updateClient(client.client.documentId, client);
    }
  },
  getters: {
    city: state => state.city,
    cities: state => state.cities,
    styles: state => state.styles,
    client: state => state.client
  },
  modules: {
    master,
    filter,
    auctions
  }
})