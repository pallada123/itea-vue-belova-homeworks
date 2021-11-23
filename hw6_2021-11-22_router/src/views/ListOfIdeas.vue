<template>
  <div>
    <h1>List of Ideas</h1>
    <div class="row">
      <div v-for="item in ideasData" :key="item.id">
        <idea-card :single-idea="item" />
      </div>
    </div>
  </div>
</template>

<script>

import ideasData from '../data/ideasData'
import IdeaCard from "../components/IdeaCard";

export default {
  name: "ListOfIdeas",

  components: {
    IdeaCard,
  },

  data() {
    return {
      ideasData,
    }
  },
}
</script>

<style scoped>

</style>