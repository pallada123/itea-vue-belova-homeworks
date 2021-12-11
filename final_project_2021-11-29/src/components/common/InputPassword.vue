<template>
  <input type="password" v-model="inputValue" />
</template>

<script>
export default {
  name: "InputPassword",

  props: ['input', 'type'],

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
input[type="password"]{
  height: 32px;
  line-height: 32px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  background-clip: padding-box;
  background-color: var(--input-bgcolor);
  color: var(--input-color);
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--text-size);
  padding: 0 15px;
  display: inline-block;
  min-width: 1px;
}

input[type="password"].input-error{

  border-color: var(--input-border-error);
}
</style>