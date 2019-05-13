

const state = {

    time: 0,
    interval: 0,
    timeLimit: 10000

}



const mutations = {

    startTimer: state => {

        state.time = state.timeLimit;

        state.interval = setInterval(function() {

            state.time -= 100;

            if (state.time === 0) {

                clearInterval(state.interval);

            }

        }, 100);

    },


    stopTimer: state => {

        clearInterval(state.interval);

    }

}



const getters = {

    getTimeLeft: state => {
        return (state.time / 1000).toFixed(1);
    },

    getTimeIsUp: state => {
        return state.time === 0;
    }

}



export default {
    state,
    mutations,
    getters    
}