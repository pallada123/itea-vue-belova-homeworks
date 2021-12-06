<template>
<div id="filters">
  <action-button
      :class="{'btn-visual': true, 'btn-red': true, 'btn-active': filters.stateBtnRed}"
      v-if="itemsExisting.itemsRed"
      @btn-click="toggleBtnRed">Red</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-yellow': true, 'btn-active': filters.stateBtnYellow}"
      v-if="itemsExisting.itemsYellow"
      @btn-click="toggleBtnYellow">Yellow</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-green': true, 'btn-active': filters.stateBtnGreen}"
      v-if="itemsExisting.itemsGreen"
      @btn-click="toggleBtnGreen">Green</action-button>
  <action-button
      :class="{'btn-visual': true, 'btn-blank': true, 'btn-active': filters.stateBtnBlank}"
      v-if="itemsExisting.itemsBlank"
      @btn-click="toggleBtnBlank">Without status</action-button><br>
  <input-text @update:input="setSearchText" /><br>
  <action-button
      :class="'btn-visual'"
      @btn-click="clearFilters">Clear filters</action-button>
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
    }
  },

  data() {
    return {
      filters: {
        stateBtnRed: true,
        stateBtnYellow: true,
        stateBtnGreen: true,
        stateBtnBlank: true,
        searchText: ''
      },
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
  },

  methods: {


    toggleBtnRed() {
      this.filters.stateBtnRed = !this.filters.stateBtnRed;
      this.$emit('set-filters', this.filters);
    },


    toggleBtnYellow() {
      this.filters.stateBtnYellow = !this.filters.stateBtnYellow;
      this.$emit('set-filters', this.filters);
    },

    toggleBtnGreen() {
      this.filters.stateBtnGreen = !this.filters.stateBtnGreen;
      this.$emit('set-filters', this.filters);
    },

    toggleBtnBlank() {
      this.filters.stateBtnBlank = !this.filters.stateBtnBlank;
      this.$emit('set-filters', this.filters);
    },

    setSearchText(val) {
      this.filters.searchText = val;
      this.$emit('set-filters', this.filters);
    },

    clearFilters() {
      this.filters.stateBtnRed = true;
      this.filters.stateBtnYellow = true;
      this.filters.stateBtnGreen = true;
      this.filters.stateBtnBlank = true;
      this.filters.searchText = '';
      this.$emit('set-filters', this.filters);
    }

  },
}
</script>

<style scoped>

.btn-active::before {
  content: '✓ ';
  display: inline;
}

#filters input[type="text"] {margin-bottom: 10px;}
</style>