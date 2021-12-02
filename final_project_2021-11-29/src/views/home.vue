<template>
  <div class="home">
    <router-link class="btn" to="/registration">Sign Up</router-link> or <router-link class="btn" to="/auth">Log In</router-link>
    <router-view />
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {PUSH_TEST_STORAGE, GET_ACTIVE_USER_ID} from "../types/actions";


export default {
  name: 'Home',
  components: {

  },

  computed: {
    ...mapState('todo/', {
      ActiveUserId: state => state.ActiveUserId
    })
  },

  /**
   * Только для тестирования: инициирует загрузку в Local Storage нескольких пользователей с заполнеными туду-листами.
   * По результату - инициирует запрос из Local Storage ID активного пользователя.
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${PUSH_TEST_STORAGE}`);
    this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  // beforeCreate() {
  //   this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);
  // },
}
</script>

<style scoped>

.btn, .btn:hover, .btn:link, .btn:active, .btn:visited, .btn:focus {
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  background-clip: padding-box;
  border: none;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  background-color: #85c6cc;
  -moz-box-shadow: 0 6px 0 #689ea3;
  -webkit-box-shadow: 0 6px 0 #689ea3;
  box-shadow: 0 2px 0 #689ea3;
  outline: none;
  min-width: 130px;
  margin: 0 5px 10px 5px;
  text-decoration: none;
}
.btn:hover{
  background-color: #47bfcb;
  -moz-box-shadow: 0 6px 0 #3999a2;
  -webkit-box-shadow: 0 6px 0 #3999a2;
  box-shadow: 0 2px 0 #3999a2;
}
</style>
