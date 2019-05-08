import bots from "./bot";

const state = {
     bots,
        interval: {
        lowestGuess: 50,
            highestGuess: 150,
            correctAnswer: 100
    }
}
const getters = {
    availableBots(){
        return state.bots.filter(bot => !bot.isPlaying)
    },
    playingBots(){
        return state.bots.filter(bot => bot.isPlaying)
    },
    interval: () => {
        return state.interval;
    }
}

const mutations = {
    botGuesses() {
        getters.playingBots().forEach(bot => {
            mutations.updateGuess(bot.guess(state.interval))
           // store.commit('updateGuess', bot.guess(state.interval));
        })
    },
    updateGuess(state, guess) {
        if (guess === state.interval.correctAnswer) {
            console.log("Correct")
        } else if (state.interval.correctAnswer && guess < state.interval.highestGuess) {
            state.interval.highestGuess = guess;
            console.log("New highest " + guess)
        } else if (guess < state.interval.correctAnswer && guess > state.interval.lowestGuess) {
            state.interval.lowestGuess = guess;
            console.log("New lowest " + guess)
        }

    }
}
export default {
    state,
    getters,
    mutations
}