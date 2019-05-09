import Vue from 'vue'
import Vuex from 'vuex'
import questions from "./modules/questions"
import game from "./modules/game"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions,
    //game
  },



})