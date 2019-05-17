import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import botLogic from './modules/botlogic'
import generalStats from './modules/generalStats'
import timer from "./modules/timer"
import botStats from './modules/botStats'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game,
        botLogic,
        generalStats,
        botStats,
        timer
    }
});
