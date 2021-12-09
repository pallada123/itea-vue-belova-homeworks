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
     * for testing only
     * @returns {*[]|any}
     */
    [PUSH_TEST_STORAGE]() {
      api.pushTestStorage();
    },

    [GET_ACTIVE_USER]({commit}) {
      commit(SET_ACTIVE_USER, api.getActiveUser());
    },

    [CHANGE_ACTIVE_USER]({commit}, user) {
      commit(SET_ACTIVE_USER, user);
      api.setActiveUser(user ? user.userId : 0);
    },

    [GET_USERS_LIST]({commit}) {
      commit(SET_USERS_LIST, api.getUsersList());
    },

    [GET_USER_TODO_LIST]({commit, state}) {
      commit(SET_USER_TODO_LIST, api.getUserToDoList(state.ActiveUser.userId));
    },

    [UPDATE_TODO_LIST]({commit, state}, toDoArray) {
      commit(SET_USER_TODO_LIST, toDoArray);
      api.updateUserToDoList(state.ActiveUser.userId, toDoArray)
    },

    [UPDATE_USERS_LIST]({commit, state, dispatch}, params) {
      commit(SET_USERS_LIST, params.userList);
      api.updateUsersList(params.user.userId, params.userList);
      dispatch(CHANGE_ACTIVE_USER, params.user)
    }

  }
}
