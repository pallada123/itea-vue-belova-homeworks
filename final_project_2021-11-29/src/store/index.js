import Vue from 'vue'
import Vuex from 'vuex'

import todo from './todo'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo,
    history
  },
  getters: {
    /**
     *
     * @returns {`${number}-${string}-${string}, ${string}:${string}`}
     */
    getCurrentDate: () => {
      let d = new Date();
      return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}, ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    }
  }
})
