import { Getters, Mutations, Actions } from 'vuex'
import { S, A, M, G } from './type'

export const state = (): S => ({
  token: ''
})

export const actions: Actions<S, A, G, M> = {
  setToken({ commit }, payload: { token: string }) {
    commit('setToken', payload)
    return payload
  }
}

export const mutations: Mutations<S, M> = {
  setToken(state, payload: { token: string }) {
    state.token = payload.token
  }
}

export const getters: Getters<S, G> = {
  getToken(state: S) {
    return state.token
  }
}
