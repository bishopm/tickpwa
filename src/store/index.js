import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // hostname: 'http://localhost/tick/public'
    hostname: 'https://tick.church.net.za/api/public'
  },
  mutations: {
    setUser (state, newuser) {
      state.user = newuser
    },
    setToolbar (state, newtoolbar) {
      state.toolbar = newtoolbar
    }
  }
})

export default store
