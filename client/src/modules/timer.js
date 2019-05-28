

import store from '../store';

const state =  {
    time: 10000,
    interval: 0,
    timeLimit: 10000,
    isTimerZero: false
};


const getters = {
    getIsTimerZero: state => {
        return state.isTimerZero;
    },
    getTimeLeft: state => {
        return (state.time / 1000).toFixed(1);
    },

};

const mutations = {
    startTimer: state => {

        state.time = state.timeLimit;

        setTimeout(function() {

            state.interval = setInterval(function() {

                state.time -= 100;

                if (state.time === 0) {

                    clearInterval(state.interval);
                    state.isTimerZero = !state.isTimerZero;

                }

            }, 100);

        }, store.getters.getAnimationTime);

    },


    stopTimer: state => {
        clearInterval(state.interval);
    }
}

export default{
    state,
    getters,
    mutations
}