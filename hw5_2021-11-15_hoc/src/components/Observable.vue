<template>
  <div>
    <h2>Observable</h2>
    <div v-if="!isLoaded">Loading...</div>
    <div id="anime-container">
      <anime-card
        v-for="item in Anime"
        :key="item.mal_id"
        :single-anime="item"
        @show-popup="showPopup"
      />
      <popup
          v-if="isPopup"
          :anime="singleAnime"
          @close-popup="closePopup"
      />
    </div>

  </div>
</template>

<script>
import { actions, getters } from '../store'
import AnimeCard from "./observable/AnimeCard";
import Popup from "./observable/Popup";



export default {
  name: 'Observe',
  components: {
    AnimeCard,
    Popup
  },
  data() {
    return {
      isPopup: false,
      singleAnime: {
        type: Object
      }
    }
  },
  computed: {
    ...getters
  },

  /**
   * отложенно вызывает метод получения аниме из хока
   */
  beforeCreate() {
    const vm = this
    setTimeout(() => {
      vm.getAnime()
    }, 500)
  },
  methods: {

    /**
     * принимает методы из хока
     */
    ...actions,

    /**
     * вызывает попап, переопределяет, какое аниме в нём показывать
     * @param anime
     */
    showPopup(anime) {
      this.singleAnime = anime;
      this.isPopup = true;
    },

    /**
     * прячет попап
     */
    closePopup() {
      this.isPopup = false;
    },
  }
}
</script>

<style scoped>
#anime-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}
</style>