<template>
  <div class="home">
    <router-link class="btn" to="/registration">Sign Up</router-link> or <router-link class="btn" to="/auth">Log In</router-link>
    <transition name="popup">
      <router-view />
    </transition>
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {PUSH_TEST_STORAGE, GET_ACTIVE_USER} from "../types/actions";


export default {
  name: 'Home',

  inject: ['setBodyClass'],

  created() {
    this.setBodyClass();
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
   * Если активный пользователь есть - редиректит на страницу невыполненных задач.
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

.popup-enter-active, .popup-live-active {
  transition: opacity .4s;
}

.popup-enter, .popup-leave-to {
  opacity: 0;
}
</style>
