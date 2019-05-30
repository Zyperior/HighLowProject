import bots from '../javascript/bot'


export default {
    state: {
        bots
    },
    getters: {
        availableBots(state){
            return state.bots.filter(bot => !bot.isPlaying)   //Returns the bots not chosen by player
        },
        playingBots(state){
            return state.bots.filter(bot => bot.isPlaying)   //Returns the bots chosen by player
        },
        bots(state){
            return state.bots;
        }
    },
    actions: {
        cloneBot(state, bot){
            return {
                name: bot.name,
                score: 0,
                guessCount: 0,
                isHuman: false,
                correctAnswer: 0,
                isUser: false,
                answer: "",
                soundFx: bot.soundFx,
                phrases: bot.phrases,
                imgSrc: bot.imgSrc,
                guess: bot.guess
            }
        }
    }
}
