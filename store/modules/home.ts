/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Article from '@/model/article'
import {PaginationData} from '@/model/common'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  articles: Article[]
}

export const state=(): State =>({
  articles: []
})

export const getters: GetterTree<State, Root> = {}

export const mutations: MutationTree<State> = {
  M_SET_ARTICLES(state: State, articles: Article[]) {
    state.articles = articles
  }
}
export const actions: ActionTree<State, Root> = {
  async fetchList({state, commit}) {
    const that:any=this;
    try {
      const res: PaginationData<Article.RawData> = await that.$axios.get('article/all', {
        params: {index: 1, size: 3}
      })
      console.log(res)
      let articles: Article[] = res.list
        ? res.list.map((item: Article.RawData) => {
            return new Article(item)
          })
        : []
      commit('M_SET_ARTICLES', articles)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}