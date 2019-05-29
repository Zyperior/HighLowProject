import bots from '../javascript/bot'


export default {
    state: {
        bots
    },
    getters: {
        availableBots(state){
            return state.bots.filter(bot => !bot.isPlaying)
        },
        playingBots(state){
            return state.bots.filter(bot => bot.isPlaying)
        },
        bots(state){
            return state.bots;
        }
    }
}
