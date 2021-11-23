<template>
  <div class="watch-form-item">
    <label
        :style="{'color': formStyles.labelColor}">{{ label }}</label>
    <input
        type="text"
        v-model="inputValue"
        :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}">
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: ['input', 'label'],

  computed: {
    inputValue: {
      get() {
        return this.input;
      },
      set(val) {
        this.$emit('update:input', val);
      }
    }
  },

  inject: ['formStyles']
}
</script>

<style scoped>

.watch-form-item {margin-bottom: 10px}
.watch-form-item label {
  display: inline-block; width: 70px;
  text-align: right;
  padding: 0 10px 0 0;
  margin: 0;
  box-sizing: border-box;
}
.watch-form-item input[type='text'] {
  width: 200px;
  border: solid 1px #cdcdcd;
  box-sizing: border-box;
}
</style>