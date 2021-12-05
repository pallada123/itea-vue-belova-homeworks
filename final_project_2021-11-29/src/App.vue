<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

* {
  --body-bgcolor: #f5f5f5;

  --font-family: Arial, Helvetica, sans-serif;
  --text-size: 16px;
  --text-size-small: 14px;
  --text-color: #000;
  --text-color-error: #af0f23;

  --btn-bgcolor: #85c6cc;
  --btn-shadow: #689ea3;
  --btn-color: #fff;

  --btn-hover-bgcolor: #47bfcb;
  --btn-hover-shadow: #3999a2;

  --btn-switch-layout-bgcolor: #d9d9d9;
  --btn-switch-layout-shadow: #8c8c8c;
  --btn-switch-layout-color: #000;

  --btn-switch-layout-hover-bgcolor: #fff;

  --input-border: #eaeaea;
  --input-color: #808080;
  --input-bgcolor: #fff;
  --input-task-bgcolor: #f5f5f5;
  --input-border-error: #af0f23;

  --popup-overlay-bgcolor: #000;
  --popup-bgcolor: #fff;

  --task-border: #e5e5e5;
  --task-bgcolor: #fff;
  --task-done-bgcolor: #f5f5f5;
}

* {margin: 0; padding: 0;}

html, body {
  font-family: var(--font-family);
  color: var(--text-color);
  font-size: var(--text-size);
  background-color: var(--body-bgcolor);
  font-style: normal;
  margin: 0;
  padding: 0;
}
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

button, button:hover,
.btn, .btn:hover, .btn:link, .btn:active, .btn:visited, .btn:focus {
  display: inline-block;
  cursor: pointer;
  color: var(--btn-color);
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  background-clip: padding-box;
  border: none;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  background-color: var(--btn-bgcolor);
  -moz-box-shadow: 0 6px 0 var(--btn-shadow);
  -webkit-box-shadow: 0 6px 0 var(--btn-shadow);
  box-shadow: 0 2px 0 var(--btn-shadow);
  outline: none;
  min-width: 130px;
  margin: 0 5px 10px 5px;
  text-decoration: none;
}
button:hover,
.btn:hover{
  background-color: var(--btn-hover-bgcolor);
  -moz-box-shadow: 0 6px 0 var(--btn-hover-shadow);
  -webkit-box-shadow: 0 6px 0 var(--btn-hover-shadow);
  box-shadow: 0 2px 0 var(--btn-hover-shadow);
}
</style>
