<template>
<div class="unauth">
  <h1>To view the to-do list, please</h1>
  <div class="unauth-btns">
    <router-link class="btn" to="/registration">Sign Up</router-link> or <router-link class="btn" to="/auth">Log In</router-link>
  </div>
</div>
</template>

<script>
import ActionButton from "../common/ActionButton";

export default {
  name: "Unauthorized",
  components: {
    ActionButton
  }

}
</script>

<style scoped>
.unauth-btns {text-align: center;}
</style>