<template>
  <div id="app">

    <router-view name="menu" :menu-items="routes" />

    <prev-next-nav />

    <transition name="fade">
      <router-view />
    </transition>

  </div>
</template>

<script>
import router from './router';
import PrevNextNav from "./components/PrevNextNav";

export default {
  components: {
    PrevNextNav
  },
  data() {
    return {
      routes: router.options.routes
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
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 0 20px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
#app * {
  box-sizing: border-box;
}

.fade-enter-active, .fade-live-active {
  transition: opacity .4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
