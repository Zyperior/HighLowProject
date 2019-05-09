import Vue from 'vue'
import Vuex from 'vuex'
import botLogic from './modules/storemodules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      botLogic
  }
})
