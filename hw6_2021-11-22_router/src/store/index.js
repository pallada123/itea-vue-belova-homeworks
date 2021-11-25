import Vue from 'vue'

const state = Vue.observable({
  PostsList: [],
  User: {},
  SinglePost: {},
  UserPosts: []
})

export const actions = {

  /**
   * Получает список всех постов, вызывает mutations,
   * который переписывает значение переменной PostsList
   * @returns {Promise<void>}
   */
  async getPostsList() {
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts');
      data = await data.json();
      mutations.setPostsList(data);
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
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
      data = await data.json();
      mutations.setUser(data);
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
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
      data = await data.json();
      mutations.setUserPosts(data);
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
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
      data = await data.json();
      mutations.setSinglePost(data);
      if (data.userId !== this.User.id) {
        await this.getUser(data.userId);
      }
    } catch (err) {
      console.log(err);
    }
  }

}

export const mutations = {
  setPostsList: payload => state.PostsList = payload,
  setUser: payload => state.User = payload,
  setUserPosts: payload => state.UserPosts = payload,
  setSinglePost: payload => state.SinglePost = payload
}

export const getters = {
  PostsList: () => state.PostsList,
  User: () => state.User,
  UserPosts: () => state.UserPosts,
  SinglePost: () => state.SinglePost
}
