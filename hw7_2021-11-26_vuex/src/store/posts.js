import api from '@/api/api'
import {
  SET_POSTS_POSTS_LIST,
  SET_POSTS_USER,
  SET_POSTS_SINGLE_POST,
  SET_POSTS_USER_POSTS,
  SET_POSTS_IS_LOADED_POSTS_LIST,
  SET_POSTS_IS_LOADED_USER,
  SET_POSTS_IS_LOADED_SINGLE_POST,
  SET_POSTS_IS_LOADED_USER_POSTS
} from '../types/mutations'
import {
  GET_POSTS_POSTS_LIST,
  GET_POSTS_USER,
  GET_POSTS_USER_POSTS,
  GET_POSTS_SINGLE_POST,
  CLEAR_POSTS_SINGLE_POST
} from '../types/actions'

export default {
  namespaced: true,
  state: () => ({
    PostsList: [],
    User: {},
    SinglePost: {},
    UserPosts: [],
    isLoadedPostsList: false,
    isLoadedUser: false,
    isLoadedSinglePost: false,
    isLoadedUserPosts: false
  }),

  mutations: {
    [SET_POSTS_POSTS_LIST](state, payload) {
      state.PostsList = payload
    },
    [SET_POSTS_USER](state, payload) {
      state.User = payload
    },
    [SET_POSTS_SINGLE_POST](state, payload) {
      state.SinglePost = payload
    },
    [SET_POSTS_USER_POSTS](state, payload) {
      state.UserPosts = payload
    },
    [SET_POSTS_IS_LOADED_POSTS_LIST](state, payload) {
      state.isLoadedPostsList = payload
    },
    [SET_POSTS_IS_LOADED_USER](state, payload) {
      state.isLoadedUser = payload
    },
    [SET_POSTS_IS_LOADED_SINGLE_POST](state, payload) {
      state.isLoadedSinglePost = payload
    },
    [SET_POSTS_IS_LOADED_USER_POSTS](state, payload) {
      state.isLoadedUserPosts = payload
    }
  },

  actions: {

    /**
     * Получает список всех постов, инициирует мутацию state PostsList
     * @param commit
     * @returns {Promise<void>}
     */
    async [GET_POSTS_POSTS_LIST]({commit}) {
      commit(SET_POSTS_IS_LOADED_POSTS_LIST, false);
      try {
        const data = await api.getPostsList();
        commit(SET_POSTS_POSTS_LIST, await data.data);
        commit(SET_POSTS_IS_LOADED_POSTS_LIST, true);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Получает объект одного юзера, инициирует мутацию state User
     * @param commit
     * @param userId
     * @returns {Promise<void>}
     */
    async [GET_POSTS_USER]({commit}, userId) {
      commit(SET_POSTS_IS_LOADED_USER, false);
      try {
        const data = await api.getUser(userId);
        commit(SET_POSTS_USER, await data.data);
        commit(SET_POSTS_IS_LOADED_USER, true);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Получает список всех постов одного юзера, инициирует мутацию state UserPosts
     * @param commit
     * @param userId
     * @returns {Promise<void>}
     */
    async [GET_POSTS_USER_POSTS]({commit}, userId) {
      commit(SET_POSTS_IS_LOADED_USER_POSTS, false);
      try {
        const data = await api.getUserPosts(userId);
        commit(SET_POSTS_USER_POSTS, await data.data);
        commit(SET_POSTS_IS_LOADED_USER_POSTS, true);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Получает один пост; инициирует мутацию state SinglePost.
     *
     * Если ID юзера в полученном посте не совпадает с ID юзера из state User
     * (это первый запрос юзера и state User пустой, или в предыдущий раз открывали пост другого юзера) -
     * то иницирует получение одного юзера (см. выше).
     *
     * @param commit
     * @param state
     * @param dispatch
     * @param postId
     * @returns {Promise<void>}
     */
    async [GET_POSTS_SINGLE_POST]({commit, state, dispatch}, postId) {
      commit(SET_POSTS_IS_LOADED_SINGLE_POST, false);
      try {
        const data = await api.getSinglePost(postId);
        commit(SET_POSTS_SINGLE_POST, await data.data);
        commit(SET_POSTS_IS_LOADED_SINGLE_POST, true);
        if (data.data.userId !== state.User.id) {
          dispatch(GET_POSTS_USER, data.data.userId);
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * При закрытии попапа с одним инициирует мутацию state SinglePost на пустой объект.
     * @param commit
     */
    [CLEAR_POSTS_SINGLE_POST]({commit}) {
      commit(SET_POSTS_SINGLE_POST, {});
      commit(SET_POSTS_IS_LOADED_SINGLE_POST, false);
    }

  }
}
