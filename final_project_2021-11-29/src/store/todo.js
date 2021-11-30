import {
  // SET_POSTS_POSTS_LIST,
  // SET_POSTS_USER,
  // SET_POSTS_SINGLE_POST,
  // SET_POSTS_USER_POSTS,
  // SET_POSTS_IS_LOADED_POSTS_LIST,
  // SET_POSTS_IS_LOADED_USER,
  // SET_POSTS_IS_LOADED_SINGLE_POST,
  // SET_POSTS_IS_LOADED_USER_POSTS
} from '../types/mutations'
import {
  // GET_POSTS_POSTS_LIST,
  // GET_POSTS_USER,
  // GET_POSTS_USER_POSTS,
  // GET_POSTS_SINGLE_POST,
  // CLEAR_POSTS_SINGLE_POST
} from '../types/actions'

export default {
  namespaced: true,
  state: () => ({
    // PostsList: [],
    // User: {},
    // SinglePost: {},
    // UserPosts: [],
    // isLoadedPostsList: false,
    // isLoadedUser: false,
    // isLoadedSinglePost: false,
    // isLoadedUserPosts: false
  }),

  mutations: {
    // [SET_POSTS_POSTS_LIST](state, payload) {
    //   state.PostsList = payload
    // },
    // [SET_POSTS_USER](state, payload) {
    //   state.User = payload
    // },
    // [SET_POSTS_SINGLE_POST](state, payload) {
    //   state.SinglePost = payload
    // },
    // [SET_POSTS_USER_POSTS](state, payload) {
    //   state.UserPosts = payload
    // },
    // [SET_POSTS_IS_LOADED_POSTS_LIST](state, payload) {
    //   state.isLoadedPostsList = payload
    // },
    // [SET_POSTS_IS_LOADED_USER](state, payload) {
    //   state.isLoadedUser = payload
    // },
    // [SET_POSTS_IS_LOADED_SINGLE_POST](state, payload) {
    //   state.isLoadedSinglePost = payload
    // },
    // [SET_POSTS_IS_LOADED_USER_POSTS](state, payload) {
    //   state.isLoadedUserPosts = payload
    // }
  },

  actions: {


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
