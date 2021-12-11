<template>
  <div>
    <popup @close-popup="closePopup">
      <h2>Registration</h2>

      <div id="login-form">
        <div class="login-item">
          <label>Name *</label><input-text :class="{'input-error': (validation.userNameReg || validation.userNameLength)}" v-bind:input.sync="credentials.userName" />
          <error-msg v-show="validation.userNameReg">{{ errorMsg.req }}</error-msg>
          <error-msg v-show="validation.userNameLength">{{ errorMsg.length }}</error-msg>
        </div>
        <div class="login-item">
          <label>Nickname *</label><input-text :class="{'input-error': (validation.userNicknameReg || validation.userNicknameLength || validation.userNicknameExists)}" v-bind:input.sync="credentials.userNickname" />
          <error-msg v-show="validation.userNicknameReg">{{ errorMsg.req }}</error-msg>
          <error-msg v-show="validation.userNicknameLength">{{ errorMsg.length }}</error-msg>
          <error-msg v-show="validation.userNicknameExists">{{ errorMsg.nicknameExists }}</error-msg>
        </div>
        <div class="login-item">
          <label>Email</label><input-text :class="{'input-error': (validation.userEmailFormat || validation.userEmailExists)}" v-bind:input.sync="credentials.userEmail" />
          <error-msg v-show="validation.userEmailFormat">{{ errorMsg.emailFormat }}</error-msg>
          <error-msg v-show="validation.userEmailExists">{{ errorMsg.emailExists }}</error-msg>
        </div>
        <div class="login-item">
          <label>Password *</label><input-password :class="{'input-error': (validation.userPasswordReg || validation.userPasswordFormat)}" v-bind:input.sync="credentials.userPassword" />
          <error-msg v-show="validation.userPasswordReg">{{ errorMsg.req }}</error-msg>
          <error-msg v-show="validation.userPasswordFormat">{{ errorMsg.passwordFormat }}</error-msg>
        </div>
        <div class="login-item">
          <label>Repeat password *</label><input-password :class="{'input-error': (validation.userPasswordRepReg || validation.userPasswordRepFormat)}" v-bind:input.sync="credentials.userPasswordRep" />
          <error-msg v-show="validation.userPasswordRepReg">{{ errorMsg.req }}</error-msg>
          <error-msg v-show="validation.userPasswordRepFormat">{{ errorMsg.passwordRepFormat }}</error-msg>
        </div>
        <div class="task-btns">
          <action-button @btn-click="addUser">Sign Up</action-button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex';
import {GET_ACTIVE_USER, GET_USERS_LIST, UPDATE_HISTORY, UPDATE_USERS_LIST} from "../types/actions";
import InputText from "../components/common/InputText";
import ActionButton from "../components/common/ActionButton";
import Popup from "../components/common/Popup";
import ErrorMsg from "../components/login/ErrorMsg";
import InputPassword from "../components/common/InputPassword";

export default {
  name: "Registration",
  components: {InputPassword, ErrorMsg, ActionButton, InputText, Popup},

  data () {
    return {
      credentials: {
        userName: '',
        userNickname: '',
        userEmail: '',
        userPassword: ``,
        userPasswordRep: ``
      },
      validation: {
        userNameReg: false,
        userNameLength: false,
        userNicknameReg: false,
        userNicknameLength: false,
        userNicknameExists: false,
        userEmailFormat: false,
        userEmailExists: false,
        userPasswordReg: false,
        userPasswordFormat: false,
        userPasswordRepReg: false,
        userPasswordRepFormat: false,
      },
      errorMsg: {
        req: 'This field is required.',
        emailFormat: 'Please use the correct email format, e.g. someemail@domain.com.',
        passwordFormat: `The password must be length between 5 and 50 characters and can contain Latin letters, numbers and the following symbols: - _ [  ] ( ) { } < > # & / @ $ % ^ . , : ; ? !.`,
        passwordRepFormat: 'The entered passwords don\'t match.',
        nicknameExists: 'A user with this nickname already exists.',
        emailExists: 'A user with this email already exists.',
        length: 'The length must be between 3 and 50 characters'
      }
    }
  },

  inject: ['setBodyClass'],

  computed: {
    ...mapState('todo/', {
      ActiveUser: state => state.ActiveUser,
      UsersList: state => state.UsersList

    }),
    ...mapGetters([
      'getCurrentDate'
    ])
  },

  /**
   * Инициирует получение активного пользователя и списка его задач в сторе.
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_USERS_LIST}`);
    this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
  },

  created() {
    this.setBodyClass();
  },

  methods: {

    /**
     * Зактытие попапа регистрации - переход на главную страницу.
     */
    closePopup() {
      this.$router.push('/');
    },

    /**
     * Добавление нового пользователя.
     * Валидация введённых данных.
     * Если валидация прошла успешно - инициация добавления нового пользователя и смены ID активного юзера в сторе.
     */
    addUser() {

      this.validation.userNameLength = false;
      this.validation.userNicknameLength = false;
      this.validation.userNicknameExists = false;
      this.validation.userEmailFormat = false;
      this.validation.userEmailExists = false;
      this.validation.userPasswordFormat = false;
      this.validation.userPasswordRepFormat = false;

      this.validation.userNameReg = !this.credentials.userName;
      this.validation.userNicknameReg = !this.credentials.userNickname;
      this.validation.userPasswordReg = !this.credentials.userPassword;
      this.validation.userPasswordRepReg = !this.credentials.userPasswordRep;

      if (this.credentials.userNickname &&
          this.UsersList.find(item => item.userNickname.toLowerCase() === this.credentials.userNickname.toLowerCase())) {
        this.validation.userNicknameExists = true;
      }

      if (this.credentials.userEmail &&
          this.UsersList.find(item => item.userEmail.toLowerCase() === this.credentials.userEmail.toLowerCase())) {
        this.validation.userEmailExists = true;
      }

      if (this.credentials.userNickname &&
          !this.validation.userNicknameExists &&
          this.credentials.userNickname.length < 3 || this.credentials.userNickname.length > 50) {
        this.validation.userNicknameLength = true;
      }

      if (this.credentials.userName &&
          this.credentials.userName.length < 3 || this.credentials.userName.length > 50) {
        this.validation.userNameLength = true;
      }

      if (this.credentials.userEmail &&
          !this.validation.userEmailExists &&
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-z]{2,})$/i.test(this.credentials.userEmail)) {
        this.validation.userEmailFormat = true;
      }

      if (this.credentials.userPassword) {

        if (this.credentials.userPassword.length < 5 || this.credentials.userPassword.length > 50) {
          this.validation.userPasswordFormat = true;
        }

        if (!/[a-zA-Z0-9\-_\[\](){}<>#&/@$%^.,:;?!]+/.test(this.credentials.userPassword)) {
          this.validation.userPasswordFormat = true;
        }

      }

      if (this.credentials.userPassword &&
          this.credentials.userPasswordRep &&
          !this.validation.userPasswordFormat &&
          this.credentials.userPassword !== this.credentials.userPasswordRep) {
        this.validation.userPasswordRepFormat = true;
      }

      for (let key in this.validation) {
        if (this.validation[key]) {
          return;
        }
      }

      let user = {
        userId: this.getNewUserId(),
        userName: this.credentials.userName,
        userNickname: this.credentials.userNickname,
        userEmail: this.credentials.userEmail,
        userPassword: this.credentials.userPassword
      };

      this.UsersList.push(user);

      this.$store.dispatch(`todo/${UPDATE_USERS_LIST}`, {user: user, userList: this.UsersList});
      this.$store.dispatch(`history/${UPDATE_HISTORY}`, {type: 'user', user: this.credentials.userNickname, userId: user.userId, date: this.$store.getters.getCurrentDate, action: 'reg'});

      this.$router.push('/todos');
    },

    /**
     * Вычисление ID добавляемого пользователя.
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