<template>
  <input type="text" v-model="inputValue" />
</template>

<script>
export default {
  name: "InputText",
  props: ['input'],

  // data() {
  //   return {
  //     inputValue: this.input,
  //   }
  // },
  // watch: {
  //
  //   /**
  //    * наблюдает за состоянием инпута. при изменении состояния
  //    * передаёт в слушатель события в родительском компоненте новое значение input
  //    */
  //   inputValue() {
  //     this.$emit('update:input', this.inputValue);
  //   },
  // },

  /**
   * лучше делать с computed, чем с объявление переменной в data и наблюдением в watch.
   * watch более ресурсоёмкий, его использовать в крайних случаях.
   */
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