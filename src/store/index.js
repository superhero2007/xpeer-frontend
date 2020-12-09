import Vue from 'vue'
import Vuex from 'vuex'
import cards from './modules/cards'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cards
  }
})

export default store
