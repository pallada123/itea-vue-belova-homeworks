import api from '../api'

import {
  SET_ACTIVE_USER_ID,
  SET_USERS_LIST,
  SET_USER_TODO_LIST
} from '../types/mutations';

import {
  PUSH_TEST_STORAGE,
  ADD_USER,
  GET_ACTIVE_USER_ID,
  GET_USERS_LIST,
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from '../types/actions';

const storageName = 'toDoList';

export default {

  namespaced: true,

  state: () => ({
    ActiveUserId: 0,
    UsersList: [],
    UserToDoList: []
  }),

  mutations: {
    [SET_ACTIVE_USER_ID](state, payload) {
      state.ActiveUserId = payload
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

    [ADD_USER]({commit, state, dispatch}) {

    },

    [GET_ACTIVE_USER_ID]({commit}) {
      commit(SET_ACTIVE_USER_ID, api.getActiveUser());
    },

    [GET_USERS_LIST]({commit, state, dispatch}) {

    },

    [ADD_TODO_ITEM]({commit, state, dispatch}) {

    },

    [UPDATE_TODO_ITEM]({commit, state, dispatch}) {

    },

    [DELETE_TODO_ITEM]({commit, state, dispatch}) {

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
