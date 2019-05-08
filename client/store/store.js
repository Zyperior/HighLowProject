import Vue from 'vue'
import Vuex from 'vuex'
import bots from './modules/bot'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bots
  },
  state: {
    bots,
    interval: {
        lowestGuess: 0,
        highestGuess: 150,
        correctAnswer: 100,
        isInInterval: function() {
          return (this.lowestGuess < this.correctAnswer && this.highestGuess > this.correctAnswer);
        },
        isHigherThanGuess: function() {
          return (this.lowestGuess > this.highestGuess)
        },
        lastGuess: 0
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
      updateGuess(state, guess){
        console.log('Inside updateGuess')
          if(guess === state.interval.correctAnswer){
              console.log("Correct")
          }else if(guess > state.interval.correctAnswer && guess < state.interval.highestGuess){
              state.interval.highestGuess = guess;
              console.log("New highest "+guess)
          }else if(guess < state.interval.correctAnswer && guess > state.interval.lowestGuess){
              state.interval.lowestGuess = guess;
              console.log("New lowest "+guess)
          }

      }

  },
  actions: {

  }
})
