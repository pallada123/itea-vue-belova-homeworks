import api from '../api/history'

import {
    SET_HISTORY
} from '../types/mutations';

import {
    GET_HISTORY,
    UPDATE_HISTORY
} from '../types/actions';

export default {

    namespaced: true,

    state: () => ({
        History: []
    }),

    mutations: {
        [SET_HISTORY](state, payload) {
            state.History = payload
        }
    },

    actions: {

        /**
         *
         * @param commit
         */
        [GET_HISTORY]({commit}) {
            commit(SET_HISTORY, api.pullStorage());
        },

        /**
         *
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         * @returns {Promise<void>}
         */
        async [UPDATE_HISTORY]({commit, state, dispatch}, payload) {
            await dispatch(GET_HISTORY);
            let data = state.History;
            data.push(payload);
            commit(SET_HISTORY, data);
            api.updateHistory(data);
        }

    }
}
