import bots from '../javascript/bot'


export default {
    state: {
        bots
    },
    getters: {
        availableBots(state){
            return state.bots.filter(bot =>  {
                if(!bot.isPlaying){
                    return Object.assign(bot);
                }}
                )   //Returns the bots not chosen by player
        },
        playingBots(state){
            return state.bots.filter(bot => {
                if(bot.isPlaying)
                    return Object.assign(bot)
            })   //Returns the bots chosen by player
        },
        bots(state){
            return state.bots;
        }
    }
}
