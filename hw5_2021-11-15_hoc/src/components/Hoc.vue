<template>
  <div>
    <h2>HOC</h2>

    <form @submit.prevent>
      <input type="text" v-model="inputValue">
      <push-btn :val="inputValue" />
    </form>
  </div>
</template>

<script>

import PushStorButton from "./FormElements/PushStorButton";
import { PushToStorage } from './hoc/PushToStorage';

export default {
  name: "Hoc",
  components: {
    PushStorButton,
    PushBtn: PushToStorage(PushStorButton)
  },
  data() {
    return {
      inputValue: ''
    }
  },
}
</script>

<style scoped>
input[type="text"] {
  height: 32px;
  line-height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-clip: padding-box;
  background-color: #fff;
  color: #000;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  padding: 0 15px;
  display: inline-block;
  min-width: 1px;
}
</style>