<template>
  <div class="card">
    <img :src="singleIdea.img" alt="" class="card-img-top">
    <div class="card-body">
      <div class="card-title">{{ singleIdea.title }}</div>
    </div>
    <div class="card-footer">
      <router-link :to="{name: 'Idea', params: { id: singleIdea.id }}" class="card-link">Read more</router-link>
    </div>
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

</style>