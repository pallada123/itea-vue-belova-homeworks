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

  .task-style-btn button, .task-style-btn button:hover {
    color: var(--btn-switch-layout-color);
    padding: 0 10px;
    background-color: var(--btn-switch-layout-bgcolor);
    -moz-box-shadow: 0 6px 0 var(--btn-switch-layout-shadow);
    -webkit-box-shadow: 0 6px 0 var(--btn-switch-layout-shadow);
    box-shadow: 0 2px 0 var(--btn-switch-layout-shadow);
    min-width: 80px;
    margin: 0 5px 10px 5px;
  }
  .task-style-btn button:hover{
    background-color: var(--btn-switch-layout-hover-bgcolor);
  }
</style>