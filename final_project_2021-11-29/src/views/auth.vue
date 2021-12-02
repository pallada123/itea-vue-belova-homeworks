<template>
  <div>
    <popup @close-popup="closePopup">
      <h2>Authorization</h2>

      <div id="login-form">
        <div class="login-item">
          <label>Login</label><input-text v-model="credentials.userLogin" />
        </div>
        <div class="login-item">
          <label>Password</label><input-text v-model="credentials.userPassword" />
        </div>
        <div class="task-btns">
          <action-button @btn-click="$emit('check-user', credentials)">Log In</action-button>
        </div>
        <p class="error" v-show="!existing">Incorrect Login or Password. Check spelling or click Sign Up button for creating a new user.</p>
      </div>

    </popup>
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {GET_ACTIVE_USER_ID} from "../types/actions";
import InputText from "@/components/InputText";
import ActionButton from "@/components/ActionButton";
import Popup from "@/components/Popup";
import Storage from "../../../hw3_2021-11-12_todo-list/to-do/src/data";

export default {
  name: "Auth",
  components: {ActionButton, InputText, Popup},

  data () {
    return {
      credentials: {
        userLogin: '',
        userPassword: ''
      }
    }
  },

  computed: {
    ...mapState('todo/', {
      ActiveUserId: state => state.ActiveUserId
    })
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  beforeCreate() {
    this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);
  },

  methods: {
    closePopup() {
      this.$router.push('/');
    }
  },

  /**
   * при попытке залогиниться - проверка, существует ли юзер в LS.
   * если да - логин, если нет - показ ошибки "такого юзера нет"
   * @param creds - введенные в форму логина логин и пароль
   */
  checkUser(creds) {

    this.clearErrors();

    let user = Storage.pullUsers().find(item => item.userLogin === creds.userLogin && item.userPassword === creds.userPassword);

    if (user) {
      this.user = user;
    }

    else {
      this.userExists = false;
    }

  },
}
</script>

<style scoped>

</style>