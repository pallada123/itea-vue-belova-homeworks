<template>
  <div id="counter">
    <h1>Counter</h1>
    <p><button type="button" @click="increment">Click me!</button></p>
    <p>You've clicked this button {{ number }} times.</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SET_COUNTER_NUMBER} from "../types/mutations";
export default {
  name: "Counter",

  computed: {
    ...mapState('counter/', {
      number: state => state.count
    })
  },

  methods: {

    /**
     * по клику на кнопку инициирует мутацию в сторе количества кликов
     */
    increment() {
      this.$store.commit(`counter/${SET_COUNTER_NUMBER}`);
    }
  },
}
</script>

<style scoped>
#counter {
  text-align: center;
}
</style>