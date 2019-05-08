const bot1 = {
    name: 'Olle',
    guess: function(interval){
        return interval.lowGuess + 1;
    },
    timing: 2,
    isPlaying: true
}

const bot2 = {
    name: 'Olle',
    guess: function(interval){
        return interval.lowGuess + 1;
    },
    timing: 2,
    isPlaying: true
}

const bot3 = {
    name: 'Olle',
    guess: function(interval){
        return interval.lowGuess + 1;
    },
    timing: 2,
    isPlaying: false
}

const bot4 = {
    name: 'Bo',
    guess: function(interval){
        return interval.lowGuess + 1;
    },
    timing: 2,
    isPlaying: false
}

export default [bot1, bot2, bot3, bot4];
