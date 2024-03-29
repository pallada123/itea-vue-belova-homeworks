import {SET_COUNTER_NUMBER} from '../types/mutations'

export default {
    namespaced: true,

    state: () => ({
        count: 0
    }),

    mutations: {
        [SET_COUNTER_NUMBER](state) {
            state.count++;
        },
    },

    actions: {

    }
}