import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import ideas from './ideas'
import counter from './counter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    posts,
    ideas,
    counter
  }
})
