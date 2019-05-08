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

const bot6 = {
    name: 'Botinski',
    guess: function(interval){
        var guess = Math.floor(Math.random() * 5000 + 1);
        if(Math.floor(Math.random() * 100 + 1) == 100) {
            return interval.correctAnswer;
        }else
            return guess;
    },
    timing: 2,
    isPlaying: false
}

const bot7 =  {
    name: 'Das Boot',
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
        return interval.lowestGuess * 1.33;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 1981;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 1981;
    },
    timing: 2,
    isPlaying: false
}

const bot8 = {
    name: 'Segelbot',
    lastGuess: 0,
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
        var intervalSize = interval.highestGuess - interval.lowestGuess;
        this.lastGuess = interval.lowestGuess + 30;
        if(this.lastGuess >= interval.highestGuess) {
            this.lastGuess = interval.highestGuess / 2;
            return this.lastGuess;
        }
        else{
            return this.lastGuess;
        }
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 486;
    },
    guessBelow: function(interval) {
        return interval.highestGuess * -2;
    },
    timing: 2,
    isPlaying: false
}

const bot8 = {
    name: 'Anna',
    lastGuess: 0,
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
        var lowerBound = Math.floor((interval.highestGuess - interval.lowestGuess) * 0.5);
        return interval.lowestGuess + Math.floor(Math.random() * lowerBound + interval.lowestGuess);
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 2006;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 2006;
    },
    timing: 2,
    isPlaying: false
}

export default [bot1, bot2, bot3, bot4];
