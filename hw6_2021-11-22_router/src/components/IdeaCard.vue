<template>
  <div>
    <img :src="singleIdea.img" alt="">
    <div class="idea-card-title">{{ singleIdea.title }}</div>
    <router-link :to="{name: 'Idea', params: { id: singleIdea.id }}" class="card-link">Read more</router-link>
  </div>
</template>

<script>
export default {
  name: "IdeaCard",

  props: {
    singleIdea: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped>
.idea-card img {width: 100%; margin-bottom: 10px;}
</style>