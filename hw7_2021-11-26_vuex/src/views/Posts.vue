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

import {mapState} from 'vuex'
import {GET_POSTS_POSTS_LIST} from "../types/actions";

export default {
  name: "Posts",

  computed: {
    ...mapState('posts/', {
      PostsList: state => state.PostsList,
      isLoadedPostsList: state => state.isLoadedPostsList
    })
  },

  /**
   * инициирует получение в стор списка постов
   */
  beforeCreate() {
    this.$store.dispatch(`posts/${GET_POSTS_POSTS_LIST}`);
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