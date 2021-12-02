<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {margin: 0; padding: 0; }
html, body {font-family: Arial, Helvetica, sans-serif; color: #000; font-size: 16px; background-color: #f5f5f5; font-style: normal; margin: 0; padding: 0;}
html {font-smoothing: antialiased; font-weight: 400;}
a img {border:none;}
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
</style>
