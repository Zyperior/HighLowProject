import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import botLogic from './modules/storemodules'




Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game,
        botLogic
    }
});