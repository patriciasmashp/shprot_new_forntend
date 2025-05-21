import { getActiveAuctions, getInactiveAuctions } from "@/api";
import type { Auction } from "@/types/Auction";
import Filter from "@/utils/classes/Filter";


export default {
    state() {
        return {
            activeAuctions: [],
            inactiveAuctions: []
        }
    },
    mutations: {
        setActiveAuctions(state, auctions: Auction[]) {
            state.activeAuctions = auctions
            console.log(state.activeAuctions);
        },
        setInactiveAuctions(state, auctions: Auction[]) {
            state.inactiveAuctions = auctions
  
        }
    },
    actions: {
        async FETCH_ACTIVE_AUCTIONS(context) {
            const clientDocumentId = context.rootState.client.client.documentId

            const auctions = await getActiveAuctions(clientDocumentId)

            context.commit('setActiveAuctions', Object.values(auctions))
        },
        async FETCH_INACTIVE_AUCTIONS(context) {
            const clientDocumentId = context.rootState.client.client.documentId

            const auctions = await getInactiveAuctions(clientDocumentId)

            context.commit('setInactiveAuctions', Object.values(auctions))
        },
        // async CLEAR_FILTER(context) {
        //     context.commit('setFilter', null)
        // }
    },
    getters: {
        activeAuctions: state => state.activeAuctions,
        inactiveAuctions: state => state.inactiveAuctions
    }
}