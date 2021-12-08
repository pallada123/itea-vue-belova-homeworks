<template>
  <div id="app">
    <component :is="theme">
      <div>
      <action-button :class="'btn-visual'" @btn-click="theme === 'LightTheme' ? theme = 'DarkTheme' : theme = 'LightTheme'">{{ theme === 'LightTheme' ? 'Dark Theme' : 'Light Theme' }}</action-button>

      <action-button :class="'btn-visual'" @btn-click="showHistory = !showHistory">{{ 'History' }}</action-button>

      <transition name="fade">
        <router-view />
      </transition>


      <transition name="history">
        <popup @close-popup="hideHistory" v-if="showHistory">
          <history />
        </popup>
      </transition>

      </div>
    </component>
  </div>
</template>

<script>
import LightTheme from "./components/themes/LightTheme";
import DarkTheme from "./components/themes/DarkTheme";
import ActionButton from "./components/common/ActionButton";
import Popup from "./components/common/Popup";
import History from "./components/history/History";

export default {

  components: {
    History,
    Popup,
    LightTheme,
    DarkTheme,
    ActionButton
  },

  data() {
    return {
      theme: 'LightTheme',
      showHistory: false
    }
  },
  methods: {
    hideHistory() {
      this.showHistory = false
    }
  },
}
</script>

<style>

* {

  --text-size: 16px;
}

* {margin: 0; padding: 0;}

html, body {
  font-style: normal;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  --text-size: 16px;
}

html {font-smoothing: antialiased; font-weight: 400;}
a img {border:none;}
a,
a:hover,
a:link,
a:active,
a:visited,
a:focus {
  color: var(--link-color);
  text-decoration: underline;
  cursor: pointer;
}
a:hover {text-decoration: none;}

body * {box-sizing: border-box;}

#app {
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

#nav {
  text-align: center;
  margin: 0 0 30px 0;
}

#task-page > button:first-child,
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

.btn,
.btn:hover,
.btn:link,
.btn:active,
.btn:visited,
.btn:focus {
  display: inline-block;
  cursor: pointer;
  color: var(--btn-color);
  font-weight: bold;
  text-align: center;
  border-radius: 999px;
  background-clip: padding-box;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  background-color: var(--btn-bgcolor);
  outline: none;
  min-width: 130px;
  margin: 0 5px 10px 5px;
  text-decoration: none;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  border: none;
  position: relative;
  font-size: var(--text-size-small);
}
.btn:hover{
  -webkit-transform:scale(1.1);
  -ms-transform:scale(1.1);
  transform:scale(1.1);
}

.btn.btn-visual,
.btn.btn-visual:hover,
.btn.btn-visual:link,
.btn.btn-visual:active,
.btn.btn-visual:visited,
.btn.btn-visual:focus{
  background-color: var(--btn-visual-bgcolor);
  color: var(--btn-visual-color);
  border: solid 1px var(--btn-visual-border);
}

.btn.btn-red,
.btn.btn-red:hover,
.btn.btn-red:link,
.btn.btn-red:active,
.btn.btn-red:visited,
.btn.btn-red:focus {
  border-color: var(--task-border-red);
}
.btn.btn-yellow,
.btn.btn-yellow:hover,
.btn.btn-yellow:link,
.btn.btn-yellow:active,
.btn.btn-yellow:visited,
.btn.btn-yellow:focus {
  border-color: var(--task-border-yellow);
}
.btn.btn-green,
.btn.btn-green:hover,
.btn.btn-green:link,
.btn.btn-green:active,
.btn.btn-green:visited,
.btn.btn-green:focus {
  border-color: var(--task-border-green);
}
.btn.btn-blank,
.btn.btn-blank:hover,
.btn.btn-blank:link,
.btn.btn-blank:active,
.btn.btn-blank:visited,
.btn.btn-blank:focus {
  border-color: var(--task-border);
}

.fade-enter-active, .fade-live-active {
  transition: opacity .4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}



.history-enter-active, .history-live-active {
  transition: opacity .4s;
}

.history-enter, .history-leave-to {
  opacity: 0;
}
</style>
