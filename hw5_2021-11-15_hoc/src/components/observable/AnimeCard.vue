<template>
  <div class="anime-item">
    <div>
      <img :src="singleAnime.image_url" alt="" @click="$emit('show-popup', singleAnime)">
      <div class="anime-title">{{ singleAnime.title }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AnimeCard',
  props: {
    singleAnime: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.anime-item {
  width: 20%;
  padding: 0 10px 20px 10px;
  box-sizing: border-box;
}
.anime-item img {
  cursor: pointer;
  max-width: 100%;
}
</style>