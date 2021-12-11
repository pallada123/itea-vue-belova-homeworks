import api from '../api/todo'

import {
  SET_ACTIVE_USER,
  SET_USERS_LIST,
  SET_USER_TODO_LIST
} from '../types/mutations';

import {
  PUSH_TEST_STORAGE,
  GET_ACTIVE_USER,
  GET_USERS_LIST,
  GET_USER_TODO_LIST,
  CHANGE_ACTIVE_USER,
  UPDATE_TODO_LIST,
  UPDATE_USERS_LIST
} from '../types/actions';

export default {

  namespaced: true,

  state: () => ({
    ActiveUser: null,
    UsersList: [],
    UserToDoList: []
  }),

  mutations: {
    [SET_ACTIVE_USER](state, payload) {
      state.ActiveUser = payload
    },
    [SET_USERS_LIST](state, payload) {
      state.UsersList = payload
    },
    [SET_USER_TODO_LIST](state, payload) {
      state.UserToDoList = payload
    }
  },

  actions: {

    /**
     * for testing only: отправляет в ЛС тестовый список пользователей и из задачи.
     * @returns {*[]|any}
     */
    [PUSH_TEST_STORAGE]() {
      api.pushTestStorage();
    },

    /**
     * Прлучает из ЛС ID активного пользователя.
     * Инициирует мутацию state ActiveUser.
     * @param commit
     */
    [GET_ACTIVE_USER]({commit}) {
      commit(SET_ACTIVE_USER, api.getActiveUser());
    },

    /**
     * При логите, регистрации или вылогинивании:
     * Получает объект активного пользователя.
     * Вызывает мутацию state ActiveUser.
     * Передаёт в ЛС новое ID активного пользователя.
     *
     * @param commit
     * @param user
     */
    [CHANGE_ACTIVE_USER]({commit}, user) {
      commit(SET_ACTIVE_USER, user);
      api.setActiveUser(user ? user.userId : 0);
    },

    /**
     * Получает из ЛС список пользователей.
     * Вызывает мутацию state UsersList.
     * @param commit
     */
    [GET_USERS_LIST]({commit}) {
      commit(SET_USERS_LIST, api.getUsersList());
    },

    /**
     * Плучает из ЛС список задач активного пользователя.
     * Вызывает мутацию state UserToDoList.
     * @param commit
     * @param state
     */
    [GET_USER_TODO_LIST]({commit, state}) {
      commit(SET_USER_TODO_LIST, api.getUserToDoList(state.ActiveUser.userId));
    },

    /**
     * Принимает изменёный массив задач активного пользователя.
     * Вызывает мутацию state UserToDoList.
     * Передаёт в ЛС ID и изменёный массив задач активного пользователя.
     * @param commit
     * @param state
     * @param toDoArray
     */
    [UPDATE_TODO_LIST]({commit, state}, toDoArray) {
      commit(SET_USER_TODO_LIST, toDoArray);
      api.updateUserToDoList(state.ActiveUser.userId, toDoArray)
    },

    /**
     * Принимает объект нового пользователя.
     * Добавляет нового пользователя в массив пользователей.
     * Вызывает мутацию state UsersList.
     * Передаёт в ЛС ID нового пользователя и изменёный массив пользователей.
     * Вызывает экшен изменения активного пользователя.
     * @param commit
     * @param state
     * @param dispatch
     * @param params
     */
    [UPDATE_USERS_LIST]({commit, state, dispatch}, params) {
      commit(SET_USERS_LIST, params.userList);
      api.updateUsersList(params.user.userId, params.userList);
      dispatch(CHANGE_ACTIVE_USER, params.user)
    }

  }
}
