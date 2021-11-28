<template>
  <div>
    <h1>List of Ideas</h1>
    <div class="ideas-container">
      <div v-for="item in ideasData" :key="item.id" class="idea-card">
        <idea-card :single-idea="item" />
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import IdeaCard from "../components/IdeaCard";

export default {
  name: "ListOfIdeas",

  components: {
    IdeaCard,
  },

  computed: {
    ...mapState({
      ideasData: state => state.ideas.ideasData
    })
  },
}
</script>

<style scoped>
.ideas-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.idea-card {
  width: 31%;
  margin-bottom: 20px;
  text-align: center;
}
</style>