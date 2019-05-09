const bot1 = {
    name: 'Olle',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
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
    isPlaying: false,
    behavior: "Lowest guess + 1"
}

const bot2 = {
    name: 'Kerstin',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize > 10) {
            return interval.lowestGuess + Math.floor(intervalSize * 0.5);
        } else if (intervalSize <= 3) {
            return interval.lowestGuess + 1;
        }
        return Math.floor(Math.random() * intervalSize) + interval.lowestGuess;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 250;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 250;
    },
    timing: 2,
    isPlaying: false,
    behavior: "Guesses half-way between lowest and highest, but guesses randomly if >10% for correct guess"
}

const bot3 = {
    name: 'The La Bossen',
    guess: function(interval){
        let bossLow = interval.correctAnswer * 0.9;
        let bossHigh = interval.correctAnswer * 1.1;
        if ((bossHigh < interval.highestGuess) && (bossLow > interval.lowestGuess)) {
            console.log(bossHigh + ' ' + bossLow);
            return Math.floor(Math.random() * (bossHigh - bossLow)) + bossLow;
        } else if (bossLow < interval.lowestGuess && bossHigh < interval.highestGuess) {
            return Math.floor(Math.random() * (bossHigh - interval.lowestGuess) + interval.lowestGuess)
        } else if (bossHigh < interval.highestGuess && bossLow > interval.lowestGuess) {
            return Math.floor(Math.random() * (interval.highestGuess - bossLow) + bossLow)
        } else {
            return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess)
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
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess)
    },
    guessAbove: function(interval) {
        return interval.lowestGuess * 2;
    },
    guessBelow: function(interval) {
        return Math.floor(interval.highestGuess * 0.5 - 10);
    },
    timing: 2,
    isPlaying: false,
    description: "Guesses randomly between highest and lowest guess"
}

const bot5 = {
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

const bot6 =  {
    name: 'Das Boot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return Math.floor(interval.lowestGuess * 1.33); // TODO: Kan gå utanför intervallet, kan inte nå correct answer
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

const bot7 = { //TODO: Inte klar
    name: 'Segelbot',
    lastGuess: 0,
    doubler: 2,
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        var intervalSize = interval.highestGuess - interval.lowestGuess;
        this.lastGuess *= doubler;
        this.lastGuess = interval.lowestGuess * this.doubler;
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
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        console.log("wowowo")
        var intervalSize = Math.floor((interval.highestGuess - interval.lowestGuess) * 0.5);
        return Math.floor((Math.random() * intervalSize) + interval.lowestGuess);
        return guess;
    },
    guessAbove: function(interval) {
        console.log("wowowowoowowow 2")
        return interval.lowestGuess + 2006;
    },
    guessBelow: function(interval) {
        console.log("drotdrot")
        return interval.highestGuess - 2006;
    },
    timing: 2,
    isPlaying: false
}

const bot9 = {
    name: 'Abbot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        var guess = (interval.highestGuess - 1 ) - Math.floor(Math.random() * (intervalSize * 0.5));
        return guess;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 777;
    },
    guessBelow: function(interval) {
        return 0;
    },
    timing: 2,
    isPlaying: false,
    behavior: "Looks above for answers, answering in the top half of the interval"
}

const bot10 = {
    name: 'Inbotstjuven',
    guess: function(interval){
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if(intervalSize < 20) {
            return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess);
        }
        return 0;
    },
    timing: 2,
    isPlaying: false,
    behavior: "Bides his time and refuses to answer, unless > 20% chance to win"
}

const bot11 = {
    name: 'CopyBot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else if (interval.isHigher) {
            return this.guessAbove(interval);
        } else {
            return this.guessBelow(interval);
        }
    },
    inIntervalGuess: function(interval) {
        let intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize > 30 && interval.isHigherThanGuess) {
            return interval.lastGuess + 10;
        } else if(intervalSize > 30 && !interval.isHigherThanGuess) {
            return interval.lastGuess - 10;
        } else if (interval.isHigherThanGuess) {
            return interval.lastGuess + 2;
        } else if(!interval.isHigherThanGuess) {
            return interval.lastGuess - 2;
        }
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 10;
    },
    guessBelow: function(interval) {
        return interval.highestGuess - 10;
    },
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
    timing: 2,
    isPlaying: false,
    behavior: "Wins on a D20"
}

export default
 [bot1, bot2, bot3, bot4, bot5, bot11, bot6, bot7, bot8, bot9, bot10, bot12]

