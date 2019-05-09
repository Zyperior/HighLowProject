import Vue from 'vue'
import Vuex from 'vuex'
import questions2 from "./modules/questions2"
import game from "./modules/game"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions2,
    game
  },



})