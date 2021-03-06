import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hostname: 'http://localhost/tick/public'
    // hostname: 'https://tick.bishop.net.za/api/public'
  },
  mutations: {
    setUser (state, newuser) {
      state.user = newuser
    },
    setIcon (state, newicon) {
      state.icon = newicon
    },
    setTeamUsers (state, newteamusers) {
      state.teamusers = newteamusers
    },
    setToolbar (state, newtoolbar) {
      state.toolbar = newtoolbar
    },
    setDeletes (state, newdeletes) {
      state.deletes = newdeletes
    }
  }
})

export default store
