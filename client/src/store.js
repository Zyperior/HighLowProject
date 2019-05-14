import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import botLogic from './modules/storemodules'
import generalStats from './modules/generalStats'







Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game,
        botLogic,
        generalStats
    }
});
