
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



// The mutation 'flipCards' sets 'flipCards' to true, and initiates the array of indexes, if it hasn't been initiated before.
// A timeout is set, equal to the animation time plus a little margin, the margin is to avoid jitter in the animation.
// After the timeout, the first elemnet in the array 'indexes' is moved to the last position, and 'flipCards' is set to false.

const mutations = {

    flipCards: state => {
        state.flipCards = true;

        if (state.indexes.length === 0) {

            let arrayLength = store.getters.getPlayers.length;

            for (let index = 0; index < arrayLength; index++) {
                state.indexes.push(index);

            }

        }

        setTimeout(function() {
            state.indexes.push(state.indexes.shift());

            state.flipCards = false;

        }, state.animationTime + 100);

    },


    initPlayerCards: state => {
        state.indexes = []

    },

    createPlayerIndexes: state => {
        state.indexes = [...Array(store.getters.getPlayers.length).keys()]
    }

};



export default{
    state,
    getters,
    mutations
}
