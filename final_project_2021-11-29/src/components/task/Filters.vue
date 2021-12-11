<template>
<div id="filters">
  <action-button
      :class="{'btn-visual': true, 'btn-red': true, 'btn-active': filters.stateBtnRed}"
      v-if="itemsExisting.itemsRed"
      @btn-click="filters.stateBtnRed = !filters.stateBtnRed;">Red</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-yellow': true, 'btn-active': filters.stateBtnYellow}"
      v-if="itemsExisting.itemsYellow"
      @btn-click="filters.stateBtnYellow = !filters.stateBtnYellow;">Yellow</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-green': true, 'btn-active': filters.stateBtnGreen}"
      v-if="itemsExisting.itemsGreen"
      @btn-click="filters.stateBtnGreen = !filters.stateBtnGreen;">Green</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-blank': true, 'btn-active': filters.stateBtnBlank}"
      v-if="itemsExisting.itemsBlank"
      @btn-click="filters.stateBtnBlank = !filters.stateBtnBlank;">Without status</action-button><br>
  <input-text v-bind:input.sync="filters.searchText" /><br>
  <action-button
      class="btn-visual"
      @btn-click="$emit('clear-filters')">Clear filters</action-button>
</div>
</template>

<script>

import ActionButton from "@/components/common/ActionButton";
import InputText from "@/components/common/InputText";

export default {
  name: "Filters",

  components: {ActionButton, InputText},

  props: {
    ToDoList: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  computed: {
    itemsExisting() {
      return {
        itemsRed: this.ToDoList.some(item => item.taskStatus === 'red'),
        itemsYellow: this.ToDoList.some(item => item.taskStatus === 'yellow'),
        itemsGreen: this.ToDoList.some(item => item.taskStatus === 'green'),
        itemsBlank: this.ToDoList.some(item => item.taskStatus === '')
      }
    }
  }
}
</script>

<style scoped>

.btn-active::before {
  content: '✓ ';
  display: inline;
}

#filters input[type="text"]{
  margin-bottom: 10px;
}
</style>