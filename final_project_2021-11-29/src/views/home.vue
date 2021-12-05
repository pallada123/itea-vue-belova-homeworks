<template>
  <div class="home">
    <router-link class="btn" to="/registration">Sign Up</router-link> or <router-link class="btn" to="/auth">Log In</router-link>
    <router-view />
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {PUSH_TEST_STORAGE, GET_ACTIVE_USER} from "../types/actions";


export default {
  name: 'Home',
  components: {

  },

  computed: {
    ...mapState('todo/', {
      ActiveUser: state => state.ActiveUser,
      UsersList: state => state.UsersList
    })
  },

  /**
   * Только для тестирования: инициирует загрузку в Local Storage нескольких пользователей с заполнеными туду-листами.
   * По результату - инициирует запрос из Local Storage ID активного пользователя.
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${PUSH_TEST_STORAGE}`); // For testing only
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
    if (this.ActiveUser) {
      this.$router.push('/todos');
    }
  },

}
</script>

<style scoped>
</style>
