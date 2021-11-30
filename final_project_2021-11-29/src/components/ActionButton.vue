<template>
  <button type="button" @click="$emit('btn-click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton",

  props: ['btnCaption']
}


</script>

<style scoped>
  button, button:hover {
    display: inline-block;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    background-clip: padding-box;
    border: none;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background-color: #85c6cc;
    -moz-box-shadow: 0 6px 0 #689ea3;
    -webkit-box-shadow: 0 6px 0 #689ea3;
    box-shadow: 0 2px 0 #689ea3;
    outline: none;
    min-width: 130px;
    margin: 0 5px 10px 5px;
  }
  button:hover{
    background-color: #47bfcb;
    -moz-box-shadow: 0 6px 0 #3999a2;
    -webkit-box-shadow: 0 6px 0 #3999a2;
    box-shadow: 0 2px 0 #3999a2;
  }

  .task-style-btn button, .task-style-btn button:hover {
    color: #000;
    padding: 0 10px;
    background-color: #d9d9d9;
    -moz-box-shadow: 0 6px 0 #8c8c8c;
    -webkit-box-shadow: 0 6px 0 #8c8c8c;
    box-shadow: 0 2px 0 #8c8c8c;
    min-width: 80px;
    margin: 0 5px 10px 5px;
  }
  .task-style-btn button:hover{
    background-color: #fff;
  }
</style>