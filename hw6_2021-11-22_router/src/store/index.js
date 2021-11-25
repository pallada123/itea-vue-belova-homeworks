import Vue from 'vue'

const state = Vue.observable({
  PostsList: [],
  User: {},
  SinglePost: {},
  UserPosts: [],
  isLoadedPostsList: false,
  isLoadedUser: false,
  isLoadedSinglePost: false,
  isLoadedUserPosts: false
})

export const actions = {

  /**
   * Получает список всех постов, вызывает mutations,
   * который переписывает значение переменной PostsList
   * @returns {Promise<void>}
   */
  async getPostsList() {
    mutations.setIsLoadedPostsList(false);
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts');
      data = await data.json();
      mutations.setPostsList(data);
      mutations.setIsLoadedPostsList(true);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Получает объект одного юзера, вызывает mutations,
   * который переписывает значение переменной User
   * @param userId - ID юзера
   * @returns {Promise<void>}
   */
  async getUser(userId) {
    mutations.setIsLoadedUser(false);
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
      data = await data.json();
      mutations.setUser(data);
      mutations.setIsLoadedUser(true);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Получает список всех постов одного юзера, вызывает mutations,
   * который переписывает значение переменной UserPosts
   * @param userId - ID юзера
   * @returns {Promise<void>}
   */
  async getUserPosts(userId) {
    mutations.setIsLoadedUserPosts(false);
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
      data = await data.json();
      mutations.setUserPosts(data);
      mutations.setIsLoadedUserPosts(true);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Получает список одного поста; вызывает mutations,
   * который переписывает значение переменной SinglePost.
   *
   * Если ID юзера в полученном посте не совпадает с ID юзера из переменной User
   * (это первый запрос юзера и переменная User пустая, или в предыдущий раз открывали пост другого юзера) -
   * то вызывается метод getUser (см. выше).
   *
   * @param postId - ID поста
   * @returns {Promise<void>}
   */
  async getSinglePost(postId) {
    mutations.setIsLoadedSinglePost(false);
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
      data = await data.json();
      mutations.setSinglePost(data);
      mutations.setIsLoadedSinglePost(true);
      if (data.userId !== this.User.id) {
        await this.getUser(data.userId);
      }
    } catch (err) {
      console.log(err);
    }
  },

  clearSinglePost() {
    mutations.setSinglePost({});
    mutations.setIsLoadedSinglePost(false);
  }

}

export const mutations = {
  setPostsList: payload => state.PostsList = payload,
  setUser: payload => state.User = payload,
  setUserPosts: payload => state.UserPosts = payload,
  setSinglePost: payload => state.SinglePost = payload,
  setIsLoadedPostsList: payload => state.isLoadedPostsList = payload,
  setIsLoadedUser: payload => state.isLoadedUser = payload,
  setIsLoadedUserPosts: payload => state.isLoadedUserPosts = payload,
  setIsLoadedSinglePost: payload => state.isLoadedSinglePost = payload
}

export const getters = {
  PostsList: () => state.PostsList,
  User: () => state.User,
  UserPosts: () => state.UserPosts,
  SinglePost: () => state.SinglePost,
  isLoadedPostsList: () => state.isLoadedPostsList,
  isLoadedUser: () => state.isLoadedUser,
  isLoadedUserPosts: () => state.isLoadedUserPosts,
  isLoadedSinglePost: () => state.isLoadedSinglePost
}
