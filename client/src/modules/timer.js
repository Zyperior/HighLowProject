
// The time limit to guess is set to 20 seconds = 20000 ms

const state =  {
    time: 20000,
    interval: 0,
    timeLimit: 20000,
    isTimerZero: false
};

// The getter 'getTimeLeft' shows the time left with one decimal.


const getters = {
    getIsTimerZero: state => {
        return state.isTimerZero;
    },
    getTimeLeft: state => {
        return (state.time / 1000).toFixed(1);
    },

};


// The mutation 'startTimer' counts down the time in steps of 100 ms.

const mutations = {

    startTimer: state => {

        state.time = state.timeLimit;

        state.interval = setInterval(function() {

            state.time -= 100;

            if (state.time === 0) {

                clearInterval(state.interval);
                state.isTimerZero = !state.isTimerZero;

            }

        }, 100);

    },

    // The countdown is stopped by use of 'clearInterval'.

    stopTimer: state => {
        clearInterval(state.interval);
    }

};

export default{
    state,
    getters,
    mutations
}
