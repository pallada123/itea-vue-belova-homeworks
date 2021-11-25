<template>
  <div class="idea">
    <img :src="singleIdea.img" alt="">
    <div class="idea-title">{{ singleIdea.title }}</div>
    <div class="idea-text">{{ singleIdea.desc }}</div>
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
.idea {text-align: center;}
.idea-title {font-weight: bold; margin: 10px 0;}
</style>