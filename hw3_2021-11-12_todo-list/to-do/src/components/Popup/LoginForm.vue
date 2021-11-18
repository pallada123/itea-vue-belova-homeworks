<template>
  <div id="login-form">
    <div class="login-item">
      <label>Login</label><input-text v-bind:input.sync="credentials.userLogin" />
    </div>
    <div class="login-item">
      <label>Password</label><input-text v-bind:input.sync="credentials.userPassword" />
    </div>
    <div class="task-btns">
      <action-button @btn-click="$emit('add-user', credentials)">Sign Up</action-button> or <action-button @btn-click="$emit('check-user', credentials)">Log In</action-button>
    </div>
    <p class="error" v-show="!existing">Incorrect Login or Password. Check spelling or click Sign Up button for creating a new user.</p>
    <p class="error" v-show="correct">A user with this username and password already exists.</p>
  </div>
</template>

<script>
import InputText from "../FormElements/InputText";
import ActionButton from "../FormElements/ActionButton";

export default {
  name: "LoginForm",
  components: {ActionButton, InputText},

  props: {
    existing: {
      type: Boolean
    },
    correct: {
      type: Boolean
    },
  },

  data () {
    return {
      credentials: {
        userLogin: '',
        userPassword: ''
      }
    }
  }
}
</script>

<style scoped>
#login-form {
  padding: 20px;
  position: relative;
  margin-top: 50%;
  transform: translateY(-50%);
}
.login-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
}
.login-item label {width: 150px;}

.login-item input[type='text'] {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: calc(100% - 150px);
}

.task-btns {text-align: center; padding: 20px 0 0 0;}
#login-form .error {padding: 0; margin: 10px 0; color: brown; text-align: center;}
</style>