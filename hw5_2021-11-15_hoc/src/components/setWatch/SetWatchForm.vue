<template>
  <div class="watch-form">

      <div class="watch-form-item"><label :style="{'color': formStyles.labelColor}">model</label><input type="text" v-model="filters.model" :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}"></div>
      <div class="watch-form-item"><label :style="{'color': formStyles.labelColor}">type</label><input type="text" v-model="filters.type" :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}"></div>

      <button v-show="!extraKeys" type="button" @click="$emit('show-more')" :style="{'background-color': formStyles.bgButton, 'border-color': formStyles.borderButton}">Show more</button>

      <transition name="showinputs">
        <div v-show="extraKeys" class="transition-el">
          <div class="watch-form-item"><label :style="{'color': formStyles.labelColor}">size</label><input type="text" v-model="filters.size" :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}"></div>
          <div class="watch-form-item"><label :style="{'color': formStyles.labelColor}">number</label><input type="text" v-model="filters.number" :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}"></div>
          <div class="watch-form-item"><label :style="{'color': formStyles.labelColor}">color</label><input type="text" v-model="filters.color" :style="{'background-color': formStyles.bgInput, 'border-color': formStyles.borderInput}"></div>
        </div>
      </transition>

      <button v-show="sum" type="button" @click="$emit('reset-data')" :style="{'background-color': formStyles.bgButton, 'border-color': formStyles.borderButton}">Reset</button>

  </div>
</template>

<script>
export default {
  name: "SetWatchForm",
  props: {
    filters: {
      type: Object,
      default: 0
    },
    extraKeys: {
      type: Boolean,
      default: false
    },
    sum: {
      type: Number,
      default: 0
    }

  },
  inject: ['formStyles']
}
</script>

<style scoped>
.transition-el {
  position: relative;
  left: 0;
}
.showinputs-enter-active, .showinputs-leave-active {
  transition: all .5s;
}
.showinputs-enter, .showinputs-leave-to {
  opacity: 0;
  left: 50px;
}
.watch-form {
  width: 270px;
  position: relative;
  margin: 0 auto;
}
.watch-form label {
  display: inline-block; width: 70px;
  text-align: right;
  padding: 0 10px 0 0;
  margin: 0;
  box-sizing: border-box;
}
.watch-form input[type='text'] {
  width: 200px;
  border: solid 1px #cdcdcd;
  box-sizing: border-box;
}
.watch-form button {
  display: inline-block;
  border-radius: 5px;
  border: solid 1px;
  margin: 0 5px 10px 5px;
  min-width: 130px;
  height: 30px;
  line-height: 25px;

}
.watch-form .watch-form-item {margin-bottom: 10px}
</style>