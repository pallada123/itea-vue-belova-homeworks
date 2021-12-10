<template>
  <button class="btn" type="button" @click="$emit('btn-click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton"
}


</script>