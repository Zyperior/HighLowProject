
import store from '../store';


const state =  {

    flipCards: false,

    indexes: [],

    animationTime: 1000

};



const getters = {

    flipCardsOngoing: state => {

        return state.flipCards;

    },


    getPlayerIndexes: state => {

        return state.indexes;

    },

    getAnimationTime: state => {

        return state.animationTime;

    }

};



const mutations = {

    flipCards: state => {        

        state.flipCards = true;

        if (state.indexes.length === 0) {

            let arrayLength = store.getters.getActivePlayers.length;

            for (let index = 0; index < arrayLength; index++) {

                state.indexes.push(index);
                
            }

        }

        setTimeout(function() {

            state.indexes.push(state.indexes.shift());

            state.flipCards = false;

        }, state.animationTime);

    },


    initPlayerCards: state => {

        state.indexes = [];

    },


    createPlayerIndexes: state => {

        state.indexes = [];

        let arrayLength = store.getters.getActivePlayers.length;

            for (let index = 0; index < arrayLength; index++) {

                state.indexes.push(index);
                
            }

    }

};



export default{
    state,
    getters,
    mutations
}