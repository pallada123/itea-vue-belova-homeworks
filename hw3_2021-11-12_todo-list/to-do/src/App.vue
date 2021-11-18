<template>
  <div id="app">


    <div v-if="user.userLogin" id="wrapper">

      <action-button @btn-click="logOut">Log Out</action-button>

      <h1>{{user.userLogin}}'s To Do List</h1>


      <task-wrap
        :user-data="user.userData"
        @change-user="changeUser"
      />

    </div>

    <div v-else id="startPage">
      <action-button @btn-click="logIn">Sign Up or Log In</action-button>

      <popup
          v-show="popup"
          @close-popup="closePopup"
      >
        <login-form
            @add-user="addUser"
            @check-user="checkUser"
            :existing="userExists"
            :correct="incorrectCreds"
        ></login-form>
      </popup>
    </div>

  </div>
</template>

<script>
import TaskWrap from './components/TaskWrap.vue';
import EditForm from './components/EditForm.vue';
import Popup from './components/Popup/Popup.vue';
import LoginForm from './components/Popup/LoginForm.vue';
import ActionButton from "./components/FormElements/ActionButton";
import testDataBase from './testStorageData.js'; // for testing only
import Storage from './data.js';



export default {
  name: 'App',
  components: {
    TaskWrap,
    EditForm,
    Popup,
    LoginForm,
    ActionButton
  },

  data() {
    return {
      popup: false,
      userExists: true,
      incorrectCreds: false,
      user: {}
    }
  },

  created: function () {

    /**
     * for testing only:
     * закидывание в local storage трех юзеров с заполненными туду-листами из testStorageData.js
     *
     */
    this.setStartTestStorageData(testDataBase);

  },

  methods: {

    /**
     * for testing only:
     * закидывание в local storage трех юзеров с заполненными туду-листами из testStorageData.js
     * @param db
     */
    setStartTestStorageData(db) {

      if (!Storage.pullUsers().length) {
        db.forEach(user => {
          Storage.addUser(user);
        })
      }

    },

    /**
     * вылогинивание текущего юзера
     */
    logOut() {
      this.user = {};
    },

    /**
     * по нажатию на Sign Up or Log In - показ попапа с формой логина
     */
    logIn() {
      this.popup = true;
    },

    /**
     * закрытие попапа
     */
    closePopup() {
      this.popup = false;
    },

    /**
     * сохранение нового юзера в LS.
     * при сохранении - проверка, нет ли уже юзера с такими кредами.
     * если нет - сохранние в LS, если да - показ ошибки "такой юзер уже существует"
     * @param creds - введенные в форму логина логин и пароль
     */
    addUser(creds) {

      this.clearErrors();

      let user = Storage.pullUsers().find(item => item.userLogin === creds.userLogin && item.userPassword === creds.userPassword);
      if (!user) {
        user = {
          userId: this.getNewUserId(),
          userLogin: creds.userLogin,
          userPassword: creds.userPassword,
          userData: []
        };

        this.user = user;


        Storage.addUser(user);

      }

      else {
        this.incorrectCreds = true;
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

    /**
     * очистка ошиок догина и регистрации
     */
    clearErrors() {
      this.userExists = true;
      this.incorrectCreds = false;
    },

    /**
     * перезапись юзера в LS при изменении его to-do листа
     */
    changeUser() {
      let id = Storage.pullUsers().findIndex(item => item.userId === this.user.userId);
      Storage.updateUser(this.user, id);
    },

    /**
     * вычисление ID добавляемого юзера
     * @returns {number}
     */
    getNewUserId() {
      let db = Storage.pullUsers();

      if (!db.length) {
        return 1;
      }

      let existingIds = db.map(item => item.userId);
      return Math.max.apply(Math.max, existingIds) + 1;
    }
  }

}

</script>

<style>

* {margin: 0; padding: 0; }
html, body {font-family: Arial, Helvetica, sans-serif; color: #000; font-size: 16px; background-color: #f5f5f5; font-style: normal; margin: 0; padding: 0;}
html {font-smoothing: antialiased; font-weight: 400;}
a img {border:none;}
body * {box-sizing: border-box;}

#wrapper {
  height: auto;
  width: 100%;
  max-width: 1500px;
  padding: 30px 20px;
  position: relative;
  margin: 0 auto;
}

h1 {
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  margin-bottom: 30px;
}

#app {

}

#wrapper > button:first-child,
#startPage > button:first-child {
  margin-bottom: 20px;
  position: relative;
  margin-left: auto;
  margin-right: 0;
  display: block;
}
#startPage > button:first-child {
  margin-right: 20px;
  margin-top: 20px;
}
</style>
