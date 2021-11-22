import Vue from 'vue'

const state = Vue.observable({
  Anime: [],
  isLoaded: false
})

export const actions = {

  /**
   * получение объекта аниме
   * @returns {Promise<void>}
   */
  async getAnime() {
    mutations.setIsLoaded(false);
    try {
      let data = await fetch('https://api.jikan.moe/v3/top/anime');
      data = await data.json();
      mutations.setAnime(data.top);
      mutations.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}

export const mutations = {
  setAnime: payload => state.Anime = payload,
  setIsLoaded: payload => state.isLoaded = payload
}

export const getters = {
  Anime: () => state.Anime,
  isLoaded: () => state.isLoaded
}
