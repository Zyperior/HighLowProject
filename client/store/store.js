import Vue from 'vue'
import Vuex from 'vuex'
import bots from './modules/bot'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bots
  },
  state: {
    bots
  },
  getters: {
    availableBots(state){
      return bots.filter(bot => !bot.isPlaying)
    },
    unavailableBots(state){
      return bots.filter(bot => bot.isPlaying)
    }
  },
  mutations: {

  },
  actions: {

  }
})
