import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hostname: 'http://localhost/tick/public'
    // hostname: 'https://church.net.za/api'
  }
})

export default store
