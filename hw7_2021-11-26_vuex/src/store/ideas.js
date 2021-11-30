import {SET_IDEAS_SINGLE_IDEA} from '../types/mutations'
import {GET_IDEAS_SINGLE_IDEA} from '../types/actions'
import ideasData from '../data/ideasData.js'

export default {
    namespaced: true,
    state: () => ({
        ideasData,
        singleIdea: {}
    }),

    mutations: {
        [SET_IDEAS_SINGLE_IDEA](state, payload) {
          state.singleIdea = payload
        },
    },

    actions: {

        /**
         * Находит одну idea в массиве ideasData,
         * инициирует мутацию state singleIdea
         * @param commit
         * @param state
         * @param id
         */
        [GET_IDEAS_SINGLE_IDEA]({commit, state}, id) {
            const data = state.ideasData.find(item => item.id === id);
            commit(SET_IDEAS_SINGLE_IDEA, data);
        }
    }
}