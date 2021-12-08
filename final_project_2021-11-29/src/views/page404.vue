<template>
  <div>
    <h1>Error 404: Not Found</h1>

  </div>
</template>

<script>
export default {
  name: "Page404",

  inject: ['setBodyClass'],

  created() {
    this.setBodyClass();
  },
}
</script>

