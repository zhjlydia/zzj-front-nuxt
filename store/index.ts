/** @format */

import Vuex, {GetterTree, MutationTree, Store, ActionTree} from 'vuex'

export interface State {
  jobs: number
}

export const state=(): State =>( {
  jobs: 0
})

export const getters: GetterTree<State, State> = {
  pending: state => state.jobs > 0
}

export const mutations: MutationTree<State> = {
  begin(state: State) {
    state.jobs++
  },
  end(state: State, error?: Error) {
    state.jobs--
    if (error) {
      console.log(error)
    }
  }
}

export const actions: ActionTree<State, State> = {}

