<template>
  <div class="card border-1">
    <img :src="singleIdea.img" alt="" class="card-img-top">
    <div class="card-body">
      <div class="card-title">{{ singleIdea.title }}</div>
      <div class="card-text">{{ singleIdea.desc }}</div>
    </div>
  </div>
</template>

<script>
import ideasData from '../data/ideasData.js'

export default {
  name: 'Idea',
  data() {
    return {
      singleIdea: {}
    }
  },
  mounted() {
    this.singleIdea = ideasData.find(item => item.id == this.$route.params.id)
  }
}
</script>

<style scoped>

</style>