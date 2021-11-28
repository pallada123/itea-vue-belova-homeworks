<template>
  <div id="user-page">

    <div v-if="!(isLoadedUser && isLoadedUserPosts)">Loading...</div>

    <div v-else>
      <h2>{{ User.username }}</h2>

      <table>
        <tr><td>Name:</td><td>{{ User.name }}</td></tr>
        <tr><td>Email:</td><td>{{ User.email }}</td></tr>
        <tr><td>Address:</td><td>{{ User.address.street }}<br>{{ User.address.suite }}<br>{{ User.address.city }}<br>{{ User.address.zipcode }}</td></tr>
        <tr><td>Phone:</td><td>{{ User.phone }}</td></tr>
        <tr><td>Website:</td><td>{{ User.website }}</td></tr>
        <tr><td>Company:</td><td>{{ User.company.name }}</td></tr>
      </table>

      <h3>{{ User.username }}'s posts:</h3>

      <ul>
        <li v-for="post in UserPosts" :key="post.id">
          <router-link :to="{name: 'UserPost', params: { postId: post.id }}">{{ post.title }}</router-link>
        </li>
      </ul>

    </div>

    <transition name="popup">
      <router-view />
    </transition>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {GET_POSTS_USER, GET_POSTS_USER_POSTS} from "../types/actions";

export default {
  name: "User",

  computed: {
    ...mapState({
      User: state => state.posts.User,
      isLoadedUser: state => state.posts.isLoadedUser,
      UserPosts: state => state.posts.UserPosts,
      isLoadedUserPosts: state => state.posts.isLoadedUserPosts,
    })
  },

  /**
   * инициирует получение в стор одного юзера и постов одного юзера
   */
  beforeCreate() {
    this.$store.dispatch(GET_POSTS_USER, this.$route.params.userId);
    this.$store.dispatch(GET_POSTS_USER_POSTS, this.$route.params.userId);
  }

}
</script>

<style scoped>
#user-page table {
  border: none;
  position: relative;
  margin: 0 auto 50px auto;
  width: 100%;
  max-width: 430px;
}
#user-page table td {
  padding: 0 5px 0 0;
  border: none;
  vertical-align: top;
  text-align: left;
}
#user-page table tr td:first-child {font-weight: bold;}

#user-page ul {
  max-width: 500px;
  position: relative;

  margin: 0 auto;
}
#user-page ul li {text-align: left;}

.popup-enter-active, .popup-live-active {
  transition: opacity .4s;
}

.popup-enter, .popup-leave-to {
  opacity: 0;
}
</style>