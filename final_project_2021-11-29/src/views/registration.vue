<template>
  <div>
    <popup @close-popup="closePopup">
      <h2>Registration</h2>

      <div id="login-form">
        <div class="login-item">
          <label>Login</label><input-text v-bind:input.sync="credentials.userLogin" />
        </div>
        <div class="login-item">
          <label>Password</label><input-text v-bind:input.sync="credentials.userPassword" />
        </div>
        <div class="task-btns">
          <action-button @btn-click="addUser">Sign Up</action-button>
        </div>
        <p class="error" v-show="!correctCreds">A user with this username and password already exists.</p>
      </div>
    </popup>
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {GET_ACTIVE_USER, GET_USERS_LIST, UPDATE_USERS_LIST} from "../types/actions";
import InputText from "@/components/InputText";
import ActionButton from "@/components/ActionButton";
import Popup from "@/components/Popup";

export default {
  name: "Registration",
  components: {ActionButton, InputText, Popup},

  data () {
    return {
      credentials: {
        userLogin: '',
        userPassword: ''
      },
      correctCreds: true
    }
  },

  computed: {
    ...mapState('todo/', {
      ActiveUser: state => state.ActiveUser,
      UsersList: state => state.UsersList

    })
  },


  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_USERS_LIST}`);
    this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
  },

  methods: {
    closePopup() {
      this.$router.push('/');
    },

    /**
     * сохранение нового юзера в LS.
     * при сохранении - проверка, нет ли уже юзера с такими кредами.
     * если нет - сохранние в LS, если да - показ ошибки "такой юзер уже существует"
     * @param creds - введенные в форму логина логин и пароль
     */
    addUser() {

      this.correctCreds = true;

      let user = this.UsersList.find(item => item.userLogin === this.credentials.userLogin && item.userPassword === this.credentials.userPassword);

      if (!user) {
        user = {
          userId: this.getNewUserId(),
          userLogin: this.credentials.userLogin,
          userPassword: this.credentials.userPassword
        };

        this.UsersList.push(user);

        this.$store.dispatch(`todo/${UPDATE_USERS_LIST}`, {user: user, userList: this.UsersList});

        this.$router.push('/todos');

      }

      else {
        this.correctCreds = false;
      }
    },

    /**
     * вычисление ID добавляемого юзера
     * @returns {number}
     */
    getNewUserId() {

      if (!(this.UsersList && this.UsersList.length)) {
        return 1;
      }

      let existingIds = this.UsersList.map(item => item.userId);
      return Math.max.apply(Math.max, existingIds) + 1;
    }
  },
}
</script>

<style scoped>

</style>