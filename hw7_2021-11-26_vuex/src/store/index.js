import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import ideas from './ideas'
import counter from './counter'

import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {

  },
  modules: {
    posts,
    ideas,
    counter
  }
})
