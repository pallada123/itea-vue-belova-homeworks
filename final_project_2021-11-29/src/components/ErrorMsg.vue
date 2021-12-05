<template>
<p class="error"><slot></slot></p>
</template>

<script>
export default {
  name: "ErrorMsg"
}
</script>

<style scoped>
.error{
  color: var(--text-color-error);
  font-size: var(--text-size-small);
  font-style: italic;
}

.edit-form .error {
  padding: 0 0 0 150px;
  margin: 5px 0 0 0;
  text-align: center;
  width: 100%;
}

</style>