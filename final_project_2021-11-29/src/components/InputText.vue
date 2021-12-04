<template>
  <input type="text" v-model="inputValue" />
</template>

<script>
export default {
  name: "InputText",

  props: ['input'],

  computed: {
    inputValue: {
      get() {
        return this.input;
      },
      set(val) {
        this.$emit('update:input', val);
      }
    }
  }
}
</script>

<style scoped>
  input[type="text"] {
    height: 32px;
    line-height: 32px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background-clip: padding-box;
    background-color: #fff;
    color: #000;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    padding: 0 15px;
    display: inline-block;
    min-width: 1px;
  }
  input[disabled="disabled"] {opacity: .5;}

  .task-item input[type="text"] {
    background-color: #f5f5f5;
  }
</style>