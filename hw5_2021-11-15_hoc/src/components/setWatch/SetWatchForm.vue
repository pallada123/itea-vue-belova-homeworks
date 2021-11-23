<template>
  <form class="watch-form" @reset.prevent>

    <input-text
      :input.sync="filters.model"
      :label="'Model'"
    />
    <input-text
      :input.sync="filters.type"
      :label="'Type'"
    />

    <button
      type="button"
      v-show="!extraKeys"
      @click="$emit('show-more')"
      :style="{'background-color': formStyles.bgButton, 'border-color': formStyles.borderButton}">Show more</button>

    <transition name="showinputs">
      <div v-show="extraKeys" class="transition-el">
        <input-text
          :input.sync="filters.size"
          :label="'Size'"
        />
        <input-text
          :input.sync="filters.number"
          :label="'Number'"
        />
        <input-text
          :input.sync="filters.color"
          :label="'Color'"
        />
      </div>
    </transition>

    <button
      v-show="sum"
      type="reset"
      @click="$emit('reset-data')"
      :style="{'background-color': formStyles.bgButton, 'border-color': formStyles.borderButton}">Reset</button>

  </form>
</template>

<script>
import InputText from "../FormElements/InputText";

export default {
  name: "SetWatchForm",
  components: {
    InputText
  },
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
.watch-form button {
  display: inline-block;
  border-radius: 5px;
  border: solid 1px;
  margin: 0 5px 10px 5px;
  min-width: 130px;
  height: 30px;
  line-height: 25px;

}

</style>