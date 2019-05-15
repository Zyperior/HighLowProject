import bots from '../javascript/bot'


export default {
    state: {
        bots,
        interval: {
            lowestGuess: 0,
            highestGuess: 0,
            correctAnswer: 100,
            isInInterval: function() {
                return (this.lowestGuess < this.correctAnswer && this.highestGuess > this.correctAnswer);
            },
            isHigher: function() {
                return (this.lowestGuess > this.highestGuess)
            },
            lastGuess: 0
        }
    },
    getters: {
        availableBots(state){
            return state.bots.filter(bot => !bot.isPlaying)
        },
        playingBots(state){
            return state.bots.filter(bot => bot.isPlaying)
        },
        interval: state => {
            return state.interval;
        },
        bots(state){
            return state.bots;
        }
    },
    mutations: {
        updateGuess(state, guess){
            state.interval.lastGuess = guess;
            if(guess === state.interval.correctAnswer){
                console.log("Correct")
            }else if(guess > state.interval.correctAnswer && (guess < state.interval.highestGuess || state.interval.highestGuess == 0)){
                state.interval.highestGuess = guess;
                console.log("New highest "+guess)
            }else if(guess < state.interval.correctAnswer && guess > state.interval.lowestGuess){
                state.interval.lowestGuess = guess;
                console.log("New lowest "+guess)
            }else{
                // player.points -= 1;
                console.log("Inside badguess");
            }

        },
        badGuess(state, player){

        }

    },
    actions: {

    }
}
