import api from '@/api/api'
import {/*SET_NEWS_CATS, SET_IS_LOADED, SET_NEWS_SINGLE_CAT, SET_NEWS_PER_PAGE, SET_NEWS_TOTAL*/ } from '../types/mutations'
import {/*A_GET_NEWS_CATS, A_GET_NEWS_SINGLE_CAT*/ } from '../types/actions'

export default {
  namespace: true,
  state: () => ({
    // newsCats: [],
    // isLoaded: false,
    // newsSingleCat: [],
    // totalNews: 0,
    // newsPerPage: 4
  }),
  mutations: {
    // [SET_NEWS_CATS](state, payload) {
    //   state.newsCats = payload
    // },
    // [SET_IS_LOADED](state, payload) {
    //   state.isLoaded = payload
    // },
    // [SET_NEWS_SINGLE_CAT](state, payload) {
    //   state.newsSingleCat = payload
    // },
    // [SET_NEWS_PER_PAGE](state, payload) {
    //   state.newsPerPage = payload
    // },
    // [SET_NEWS_TOTAL](state, payload) {
    //   state.totalNews = payload
    // },
  },
  actions: {
    // async [A_GET_NEWS_CATS]({ commit, state, dispatch, getters  }, parms) {
    //   // dispatch('blog/myMeth', null, {root: true})
    //   commit(SET_IS_LOADED, false)
    //   try {
    //     const data = await api.getSources()
    //     commit(SET_NEWS_CATS, await data.data.sources)
    //     commit(SET_IS_LOADED, true)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // async [A_GET_NEWS_SINGLE_CAT]({commit, state}, params) {
    //
    //   try {
    //     const data = await api.getTopHeadline({
    //       params: {
    //         sources: params.id,
    //         pageSize: state.newsPerPage,
    //         page: params.page || 1
    //       }
    //     })
    //     commit(SET_NEWS_SINGLE_CAT, await data.data.articles)
    //     commit(SET_NEWS_TOTAL, await data.data.totalResults)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }
}
