const bot1 = {
    name: 'Olle',
    guess: function(interval){
        if(interval.isInInterval()) {
            return inIntervalGuess(interval);
        } else if (isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return interval.lowestGuess + 1;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 1;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 1;
    },
    timing: 2,
    isPlaying: true,
    behavior: "Lowest guess + 1"
}

const bot2 = {
    name: 'Kerstin',

    guess: function(interval){
        if(interval.isInInterval()) {
            return inIntervalGuess(interval);
        } else if (isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize > 10) {
            return interval.lowestGuess + intervalSize * 0.5;
        }
        return Math.floor(Math.random() * 10 + 1) + interval.lowestGuess;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 1;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 1;
    },
    timing: 2,
    isPlaying: true,
    behavior: "Guesses half-way between lowest and highest, but guesses randomly if >10% for correct guess"
}

const bot3 = {
    name: 'The La Bossen',
    guess: function(interval){
        let bossLow = interval.correctAnswer * 0.9;
        let bossHigh = interval.correctAnswer * 1.1;
        if (bossHigh < interval.highestGuess && bossLow > interval.lowestGuess) {
            return Math.floor(Math.random() * bossHigh + bossLow)
        } else if (bossLow < interval.lowestGuess && bossHigh < interval.highestGuess) {
            return Math.floor(Math.random() * bossHigh + interval.lowestGuess)
        } else if (bossHigh < interval.highestGuess && bossLow > interval.lowestGuess) {
            return Math.floor(Math.random() * interval.highestGuess + bossLow)
        } else {
            return Math.floor(Math.random() * interval.highestGuess + interval.lowestGuess)
        }
    },
    timing: 2,
    isPlaying: false,
    behavior: "Guesses correctAnswer +- 10%, unless highest/lowest are closer"
}

const bot4 = {
    name: 'Bo',
    guess: function(interval){
        if(interval.isInInterval()) {
            return inIntervalGuess(interval);
        } else if (isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    timing: 2,
    isPlaying: false,
    description: "Guesses randomly between highest and lowest guess"
}

const bot4 = {
    name: 'IntervalCheckerBotTillAttBörjaMed',
    guess: function(interval){
        if(interval.isInInterval()) {
            return inIntervalGuess(interval);
        } else if (isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return Math.floor(Math.random() * interval.highestGuess + interval.lowestGuess)
    },
    guessAbove: function(interval) {
        return interval.lowestGuess * 2;
    },
    guessBelow: function(interval) {
        return Math.floor(interval.highestGuess * 0.5 - 10);
    },
    timing: 2,
    isPlaying: false
}

export default [bot1, bot2, bot3, bot4];
