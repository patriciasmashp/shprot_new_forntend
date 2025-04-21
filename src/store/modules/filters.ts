

export const filter = {
    state() {
        return {
            filter: null
        }
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        }
    },
    actions: {
        async SET_FILTER(context, filter: any) {       
            context.commit('setFilter', filter)
        },
        async CLEAR_FILTER(context) {
            context.commit('setFilter', null)
        }
    },
    getters: {
        filter: state => state.filter
    }
}