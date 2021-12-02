import api from '../api'

import {
  SET_ACTIVE_USER_ID,
  SET_ACTIVE_USER,
  SET_USERS_LIST,
  SET_USER_TODO_LIST
} from '../types/mutations';

import {
  PUSH_TEST_STORAGE,
  GET_ACTIVE_USER_ID,
  GET_USERS_LIST,
  GET_USER_TODO_LIST,
  CHANGE_ACTIVE_USER_ID,
  UPDATE_TODO_LIST,
  UPDATE_USERS_LIST
} from '../types/actions';

export default {

  namespaced: true,

  state: () => ({
    ActiveUserId: 0,
    ActiveUser: {},
    UsersList: [],
    UserToDoList: []
  }),

  mutations: {
    [SET_ACTIVE_USER_ID](state, payload) {
      state.ActiveUserId = payload
    },
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

    [GET_ACTIVE_USER_ID]({commit}) {
      commit(SET_ACTIVE_USER_ID, api.getActiveUser());
    },

    [CHANGE_ACTIVE_USER_ID]({commit}, userId) {
      commit(SET_ACTIVE_USER_ID, userId);
      api.setActiveUser(userId)
    },

    [GET_USERS_LIST]({commit}) {
      commit(SET_USERS_LIST, api.getUsersList());
    },

    [GET_USER_TODO_LIST]({commit, state}) {
      commit(SET_USER_TODO_LIST, api.getUserToDoList(state.ActiveUserId));
    },

    [UPDATE_TODO_LIST]({commit, state}, toDoArray) {
      commit(SET_USER_TODO_LIST, toDoArray);
      api.updateUserToDoList(state.ActiveUserId, toDoArray)
    },

    [UPDATE_USERS_LIST]({commit, state, dispatch}, params) {
      commit(SET_USERS_LIST, params.userList);
      commit(SET_ACTIVE_USER, params.user);
      api.updateUsersList(params.user.userId, params.userList);
      dispatch(CHANGE_ACTIVE_USER_ID, params.user.userId);
    },


    // async [GET_POSTS_SINGLE_POST]({commit, state, dispatch}, postId) {
    //   commit(SET_POSTS_IS_LOADED_SINGLE_POST, false);
    //   try {
    //     const data = await api.getSinglePost(postId);
    //     commit(SET_POSTS_SINGLE_POST, await data.data);
    //     commit(SET_POSTS_IS_LOADED_SINGLE_POST, true);
    //     if (data.data.userId !== state.User.id) {
    //       dispatch(GET_POSTS_USER, data.data.userId);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },


  }
}
