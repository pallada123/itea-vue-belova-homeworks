<template>
  <div>
    <h1>Posts</h1>
    <div class="posts-container">

      <div v-if="!isLoadedPostsList">Loading...</div>
      <ul v-else>
        <li v-for="post in PostsList" :key="post.id">
          <router-link :to="{name: 'Post', params: { postId: post.id }}">{{ post.title }}</router-link>
        </li>
      </ul>
    </div>
    <transition name="popup">
      <router-view />
    </transition>
  </div>
</template>

<script>
import {actions, getters} from "../store";

export default {
  name: "Posts",

  computed: {
  ...getters
  },

  /**
   * отложенно (чтобы this уже был) вызывает метод получения списка постов из хока
   */
  beforeCreate() {
    const vm = this
    setTimeout(() => {
      vm.getPostsList()
    }, 0)
  },

  methods: {

    /**
     * принимает методы из хока
     */
  ...actions

  }
}
</script>

<style scoped>
.posts-container {
  text-align: left;
}

.popup-enter-active, .popup-live-active {
  transition: opacity .4s;
}

.popup-enter, .popup-leave-to {
  opacity: 0;
}
</style>