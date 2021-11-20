<template>
  <div id="app">
    <directives></directives>
    <slider></slider>
  </div>
</template>

<script>

import Directives from "./components/Directives";
import Slider from "./components/Slider";

export default {
  name: 'App',
  components: {
    Directives,
    Slider
  }
}
</script>

<style>
#app {

}
</style>
