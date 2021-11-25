<template>
  <div id="user-page">

    <div v-if="!isLoadedUser">Loading...</div>

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

      <div v-if="!isLoadedUserPosts">Loading...</div>

      <ul v-else>
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
import {actions, getters} from "../store";

export default {
  name: "User",


  computed: {
    ...getters
  },

  /**
   * отложенно (чтобы this уже был) вызывает метод получения одного юзера из хока
   */
  beforeCreate() {
    const vm = this
    setTimeout(() => {
      vm.getUser(this.$route.params.userId);
      vm.getUserPosts(this.$route.params.userId);
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