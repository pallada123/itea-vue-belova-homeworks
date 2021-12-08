<template>
  <input :type="type ? type : 'text'" v-model.trim="inputValue" />
</template>

<script>
export default {
  name: "InputText",

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
  input[type="text"],
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
  input[disabled="disabled"] {opacity: .5;}

  .task-item input[type="text"] {
    background-color: var(--input-task-bgcolor);
  }

  input[type="text"].input-error,
  input[type="password"].input-error{

    border-color: var(--input-border-error);
  }
</style>