const bot1 = {
    name: 'Olle',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return interval.lowestGuess + 1;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess - 1;
    },
    unfair: false,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    behavior: "Lowest guess + 1"
}

const bot2 = {
    name: 'Kerstin',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize > 10) {
            return interval.lowestGuess + Math.floor(intervalSize * 0.5);
        }
        return Math.floor(Math.random() * (intervalSize - 1)) + interval.lowestGuess + 1;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 250;
    },
    unfair: false,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: "Guesses half-way between lowest and highest, but guesses randomly if >10% for correct guess"
}

const bot3 = {
    name: 'The La Bossen',
    guess: function(interval){
        let bossLow = interval.correctAnswer * 0.9;
        let bossHigh = interval.correctAnswer * 1.1;

        if(bossLow < interval.lowestGuess) {
            bossLow = interval.lowestGuess;
        }
        if(bossHigh > interval.highestGuess && interval.highestGuess != 0) {
            bossHigh = interval.highestGuess;
        }
        return Math.floor(Math.random() * (bossHigh - 1 - bossLow) + bossLow + 1);

    },
    unfair: true,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: "Guesses correctAnswer +- 10%, unless highest/lowest are closer"
}

const bot4 = {
    name: 'Bo',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess - 1) + interval.lowestGuess + 1);
    },
    guessAbove: function(interval) {
       return interval.lowestGuess * 2;
    },
    unfair: false,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    description: "Guesses randomly between highest and lowest guess"
}

const bot5 = {
    name: 'Botinski',
    guess: function(interval){
        if (Math.floor(Math.random() * 100 + 1) == 10) {
            return interval.correctAnswer;
        }else
            return Math.floor(Math.random() * 5000 + 1);
    },
    unfair: true,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    behavior: 'Has a 1% chance of guessing correctly, otherwise guesses a random number between 1-5000'
}

const bot6 =  {
    name: 'Das Boot',
    doubler: Math.random() + 1,
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
            return Math.round(((interval.highestGuess - interval.lowestGuess) * 0.1) + 0.3) + interval.lowestGuess;
        },
    guessAbove: function(interval) {
        return interval.lowestGuess + 1981;
    },
    unfair: true,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: 'The smaller the interval is the smaller its guesses are'
}

const bot7 = {
    name: 'Segelbot',
    lastGuess: 0,
    doubler: 2,
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        if(interval.lastGuess > interval.highestGuess || interval.lastGuess < interval.lowestGuess){
            return 0;
        }
        var intervalSize = interval.highestGuess - interval.lowestGuess;
        console.log(intervalSize);
        if(intervalSize >= 1000)
            return Math.floor(interval.lowestGuess + intervalSize * 0.8);
        else if(intervalSize >= 100)
            return Math.floor(interval.lowestGuess + intervalSize * 0.5);
        else if(intervalSize >= 10)
            return Math.floor(interval.lowestGuess + intervalSize * 0.2);
        else
            return interval.lowestGuess + 1;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 486;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: 'If interval > 1000, it guesses four fifths of that, if between 100 and 1000 it guesses half, if between 10 and 100 it guesses a fifth, else it guesses 1'
}

const bot8 = {
    name: 'Anna',
    lastGuess: 0,
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        var intervalSize = Math.floor((interval.highestGuess - interval.lowestGuess) * 0.5);
        return Math.floor((Math.random() * (intervalSize - 1)) + interval.lowestGuess + 1);
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 2006;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: 'Looks down below for an answer, guesses randomly within the lower half of the interval'
}

const bot9 = {
    name: 'Abbot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        return (interval.highestGuess - 1 ) - Math.floor(Math.random() * (intervalSize * 0.5));
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 777;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: "Looks above for answers, answering in the top half of the interval"
}

const bot10 = {
    name: 'Inbotstjuven',
    guess: function(interval){
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if(intervalSize < 5) {
            return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess);
        }
        return 0;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: "Bides his time and refuses to answer, unless > 20% chance to win"
}

const bot11 = {
    name: 'CopyBot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize > 30 && !interval.isHigher) {
            return interval.lastGuess + 10;
        } else if(intervalSize > 30 && interval.isHigher) {
            return interval.lastGuess - 10;
        } else if (!interval.isHigher) {
            return interval.lastGuess + 1;
        } else if(interval.isHigher) {
            return interval.lastGuess - 1;
        }
    },
    guessAbove: function(interval) {

        return 10 + interval.lowestGuess;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: "Copies player's guess and adds 10 or 2 depending on how close to answer"
}

const bot12 = {
    name: 'Dungeon Master',
    guess: function(interval){
        if(Math.floor(Math.random() * 20 + 1) == 20) {
            return interval.correctAnswer;
        } else return 0;
    },
    unfair: true,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: "Wins on a D20"
}


const bot13 = {
    name: "Not a bot",
    guess: function(interval){
        let max = 0;
        let min = 0;

        if(interval.highestGuess === 0 || interval.highestGuess > interval.correctAnswer * 1.4){
            max = Math.ceil(interval.correctAnswer * (1.4));
        } else {
            max = interval.highestGuess;
        }

        if(interval.lowestGuess === 0 || interval.lowestGuess < interval.correctAnswer * 0.6){
            min = Math.floor(interval.correctAnswer * (0.6));
        } else {
            min = interval.lowestGuess;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    },
    unfair: false,
    difficulty: "medium",
    timing: 2,
    isPlaying: false,
    behaviour: "Guesses suspiciously life like..."
}

export default
 [bot1, bot2, bot3, bot4, bot5, bot11, bot6, bot7, bot8, bot9, bot10, bot12, bot13]