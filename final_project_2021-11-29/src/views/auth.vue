<template>
  <div>
    <popup @close-popup="closePopup">
      <h2>Authorization</h2>

      <div id="login-form">
        <div class="login-item">
          <label>Nickname or email</label><input-text v-bind:input.sync="credentials.userNickname" />
        </div>
        <div class="login-item">
          <label>Password</label><input-text :type="'password'" v-bind:input.sync="credentials.userPassword" />
        </div>
        <div class="task-btns">
          <action-button @btn-click="checkUser">Log In</action-button>
        </div>
        <error-msg v-show="!existing">Incorrect nickname, email or password. Check spelling or click Sign Up button for creating a new user.</error-msg>
      </div>

    </popup>
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {CHANGE_ACTIVE_USER, GET_ACTIVE_USER, GET_USERS_LIST} from "../types/actions";
import InputText from "../components/common/InputText";
import ActionButton from "../components/common/ActionButton";
import Popup from "../components/common/Popup";
import ErrorMsg from "../components/login/ErrorMsg";

export default {
  name: "Auth",
  components: {ErrorMsg, ActionButton, InputText, Popup},

  data () {
    return {
      credentials: {
        userNickname: '',
        userPassword: ''
      },
      existing: true
    }
  },

  computed: {
    ...mapState('todo/', {
      ActiveUser: state => state.ActiveUser,
      UsersList: state => state.UsersList
    })
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
    this.$store.dispatch(`todo/${GET_USERS_LIST}`);
  },

  methods: {
    closePopup() {
      this.$router.push('/');
    },

    /**
     * при попытке залогиниться - проверка, существует ли юзер в LS.
     * если да - логин, если нет - показ ошибки "такого юзера нет"
     * @param creds - введенные в форму логина логин и пароль
     */
    checkUser() {

      this.existing = true;

      if (!(this.UsersList && this.UsersList.length)) {
        this.existing = false;
        return;
      }

      let user = this.UsersList.find(item =>
          (this.credentials.userNickname === item.userNickname || this.credentials.userNickname === item.userEmail) &&
          item.userPassword === this.credentials.userPassword);

      if (!user) {
        this.existing = false;
      }

      else {

        this.existing = true;

        this.$store.dispatch(`todo/${CHANGE_ACTIVE_USER}`, user);

        this.$router.push('/todos');

      }

    },
  }
}
</script>

<style scoped>

</style>