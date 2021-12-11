import Vue from 'vue';
import Vuex from 'vuex';

import todo from './todo';
import history from './history';

const calcDateFormat = (period) => {
  return ("0"+period).slice(-2);
};

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
      return `${d.getFullYear()}-${calcDateFormat(d.getMonth()+1)}-${calcDateFormat(d.getDate())}, ${calcDateFormat(d.getHours())}:${calcDateFormat(d.getMinutes())}:${calcDateFormat(d.getSeconds())}`;
    },
  }
})

