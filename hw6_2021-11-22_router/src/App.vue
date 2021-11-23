<template>
  <div id="app">

    <router-view name="menu" :menu-items="routs" />

    <transition name="fade">
      <router-view />
    </transition>

  </div>
</template>

<script>
import router from './router'

export default {
  data() {
    return {
      routs: router.options.routes
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active, .fade-live-active {
  transition: opacity .4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
