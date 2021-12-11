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
         * Получает из ЛС и инициирует мутацию state History.
         * @param commit
         */
        [GET_HISTORY]({commit}) {
            commit(SET_HISTORY, api.pullStorage());
        },

        /**
         * Иниццирует получение истории из ЛС.
         * Добавляет в массив истории новую запись.
         * Иницирует мутацию state History.
         * Отправляет в ЛС изменённую истори.
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
