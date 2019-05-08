import Vue from 'vue'
import Vuex from 'vuex'
import bots from './modules/bot'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bots,
    interval: {
        lowestGuess: 50,
        highestGuess: 150,
        correctAnswer: 100
    }
  },
  getters: {
    availableBots(state){
      return bots.filter(bot => !bot.isPlaying)
    },
    playingBots(state){
      return bots.filter(bot => bot.isPlaying)
    },
    interval: state => {
        return state.interval;
    }
  },
  mutations: {
      botGuesses(state, getters){
        getters.playingBots.forEach(bot => {
            store.commit('updateGuess', bot.guess(state.interval));
        })
      },
      updateGuess(state, guess){
          if(guess === state.interval.correctAnswer){
              console.log("Correct")
          }else if(guess > state.interval.correctAnswer && guess < interval.highestGuess){
              state.interval.highestGuess = guess;
              console.log("New highest "+guess)
          }else if(guess < state.interval.correctAnswer && guess > interval.lowestGuess){
              state.interval.lowestGuess = guess;
              console.log("New lowest "+guess)
          }


          state.interval
      }

  },
  actions: {

  }
})
