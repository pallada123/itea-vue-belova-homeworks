<template>
  <div>
    <popup @close-popup="closePopup">
      <h2>Authorization</h2>

      <div id="login-form">
        <div class="login-item">
          <label>Nickname or email</label><input-text v-bind:input.sync="credentials.userNickname" />
        </div>
        <div class="login-item">
          <label>Password</label><input-password v-bind:input.sync="credentials.userPassword" />
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
import InputPassword from "../components/common/InputPassword";

export default {
  name: "Auth",
  components: {InputPassword, ErrorMsg, ActionButton, InputText, Popup},

  inject: ['setBodyClass'],

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

  created() {
    this.setBodyClass();
  },

  /**
   * Инициирует получение активного пользователя и списка его задач в сторе.
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
    this.$store.dispatch(`todo/${GET_USERS_LIST}`);
  },

  methods: {

    /**
     * Зактытие попапа авторизации - переход на главную страницу.
     */
    closePopup() {
      this.$router.push('/');
    },

    /**
     * Валидация введённых полей.
     * Если валидация пройдена успешно (пользователь с введёными кредами найден) -
     * инициирует смену активного пользователя в сторе и редиректит на страницу невыполненных задач.
     */
    checkUser() {

      this.existing = true;

      if (!(this.UsersList && this.UsersList.length)) {
        this.existing = false;
        return;
      }

      let user = this.UsersList.find(item =>
          (this.credentials.userNickname.toLowerCase() === item.userNickname.toLowerCase() || this.credentials.userNickname.toLowerCase() === item.userEmail.toLowerCase()) &&
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