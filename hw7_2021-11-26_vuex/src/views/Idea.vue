<template>
  <div class="idea">
    <img :src="singleIdea.img" alt="">
    <div class="idea-title">{{ singleIdea.title }}</div>
    <div class="idea-text">{{ singleIdea.desc }}</div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import {GET_IDEAS_SINGLE_IDEA} from "../types/actions";

export default {
  name: "Idea",

  computed: {
    ...mapState({
      singleIdea: state => state.ideas.singleIdea
    })
  },

  /**
   * инициирует получение одной idea
   */
  beforeCreate() {
      this.$store.dispatch(GET_IDEAS_SINGLE_IDEA, this.$route.params.id);
  },
}
</script>

<style scoped>
.idea {text-align: center;}
.idea-title {font-weight: bold; margin: 10px 0;}
</style>