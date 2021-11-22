<template>
  <div id="app">

    <hoc />

    <set-watch-provide-injection />

    <observable />


  </div>
</template>

<script>

import Observable from "./components/Observable";
import Hoc from "./components/Hoc";
import SetWatchProvideInjection from "./components/SetWatchProvideInjection";

export default {
  name: 'App',
  components: {
    Hoc,
    SetWatchProvideInjection,
    Observable
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
  margin-top: 60px;
}
</style>
