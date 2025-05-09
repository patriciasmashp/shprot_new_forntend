import { getMaster, getMasters, updateMaster } from "@/api/masters";
import type { Master } from "@/types/Master";
import { DEFAULT_CITY_NAME } from "@/utils/consts";

export const master = {
    state() {
        return {
            master: null,
            masters: []
        }
    },
    mutations: {
        setMaster(state, master) {
            state.master = master
        },
        setMasters(state, masters) {
            state.masters = masters
        },
        clearMaster(state) {
            state.master = null
        },
        clearMasters(state) {
            state.masters = []
        },
        likeMaster(state, master_documentId: string) {
            const isHomePage = state.masters.find((master: Master) => master.documentId === master_documentId)
            console.log(isHomePage, '123 ');

            if (isHomePage) {
                state.masters.find((master: Master) => master.documentId === master_documentId).likes++;

            } else {

                state.master.likes++;
            }
        },
        updateMaster(state, masters: Array<Master>) {
            state.masters = masters
        }
    },
    actions: {
        async FETCH_MASTER(context, masterDocumentId: string) {
            const master = await getMaster(masterDocumentId)
            context.commit('setMaster', master)
            console.log(master);
            
            return master
        },
        async FETCH_MASTERS(context, { page = 1, pageSize = 10, city = DEFAULT_CITY_NAME, filters = {} }) {
            console.log(filters);
            
            const strapiData = await getMasters({ page: page, pageSize: pageSize, city: city, filters: filters })
            context.commit('setMasters', strapiData.data)
            return strapiData
        },
        UPDATE_MASTERS(context, masters: Array<Master>) {
            context.commit('updateMaster', masters)
        },
        async likeMaster(context, masterDocumentId: string) {

            context.commit('likeMaster', masterDocumentId)
        },
        RESET_MASTER(context) {
            context.commit('clearMaster')
        },
        CLEAR_MASTERS(context) {
            context.commit('clearMasters')
        }
    },
    getters: {
        master: state => state.master,
        masters: state => state.masters
    }
}