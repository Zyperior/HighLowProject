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
        return interval.lowestGuess + 1;
    },
    unfair: false,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    behavior: "Lowest guess + 1",
    phrases: {
        guessing: [
            "Is it my turn?",
            "How do I do this again?",
        ],
        badGuess: "Is.. is that how you're supposed to play?",
        otherCorrect: "Well done!",
        thisBotCorrect: "Wait.. was that it?",
        otherWinGame: "Congratulations!",
        thisBotWinGame: "What happened?"
    }
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
        } else if (intervalSize <= 3) {
            return interval.lowestGuess + 1;
        }
        return Math.floor(Math.random() * intervalSize) + interval.lowestGuess;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 250;
    },
    unfair: false,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: "Guesses half-way between lowest and highest, but guesses randomly if >10% for correct guess",
    phrases: {
        guessing: [
            "",
            ""
        ],
        badGuess: "",
        otherCorrect: "",
        thisBotCorrect: "",
        otherWinGame: "",
        thisBotWinGame: ""
    }
}

const bot3 = {
    name: 'The La Bossen',
    guess: function(interval){
        let bossLow = interval.correctAnswer * 0.9;
        let bossHigh = interval.correctAnswer * 1.1;
        console.log("high: "+bossHigh + ' ' + "low: "+bossLow);
        if ((bossHigh < interval.highestGuess) && (bossLow > interval.lowestGuess)) {
            return Math.floor(Math.random() * (bossHigh - bossLow)) + bossLow;
        } else if (bossLow < interval.lowestGuess && bossHigh < interval.highestGuess) {
            return Math.floor(Math.random() * (bossHigh - interval.lowestGuess) + interval.lowestGuess)
        } else if (bossHigh < interval.highestGuess && bossLow < interval.lowestGuess) {
            return Math.floor(Math.random() * (interval.highestGuess - bossLow) + bossLow)
        } else {
            if(interval.highestGuess <= interval.lowestGuess)
                return Math.floor(Math.random() * (bossHigh - bossLow) + bossLow);
            return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess)
        }
    },
    unfair: true,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    behavior: "Guesses correctAnswer +- 10%, unless highest/lowest are closer",
    phrases: {
        guessing: [
            "I’m gonna make him an offer he can’t refuse.",
            "Capiche?",
        ],
        badGuess: "Mamma mia!",
        otherCorrect: "Che bello!",
        thisBotCorrect: "Nothing personal, it’s just business.",
        otherWinGame: "You wanna play rough? Okay. Say hello to my little friend!",
        thisBotWinGame: "Veni, vidi, vici."
    }
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
        return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess)
    },
    guessAbove: function(interval) {
        return interval.lowestGuess * 2;
    },
    unfair: false,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    description: "Guesses randomly between highest and lowest guess",
    phrases: {
        guessing: [
            "Jå gissar.",
            "E la änna min tur nu."
        ],
        badGuess: "Den gissningen e änna ut i tjotahejti.",
        otherCorrect: "Äru go eller?",
        thisBotCorrect: "E la inget mä detta!",
        otherWinGame: "Hallå eller. Änna bra gjort!",
        thisBotWinGame: "Änna görkul detta!"
    }
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
    unfair: true,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    phrases: {
        guessing: [
            "CYKA BLYAT!",
            "RUSH B!"
        ],
        badGuess: "Pfah! Capitalists..",
        otherCorrect: "ну ты даёшь!",
        thisBotCorrect: "Nostrovia!",
        otherWinGame: "In Mother Russia, game wins you.",
        thisBotWinGame: "Radost.",
    }
}

const bot6 =  {
    name: 'Das Boot',
    guess: function(interval){
        if(interval.isInInterval()) {
            return this.inIntervalGuess(interval);
        } else {
            return this.guessAbove(interval);
        }
    },
    inIntervalGuess: function(interval) {
        return Math.floor(interval.lowestGuess * 1.33); // TODO: Kan gå utanför intervallet, kan inte nå correct answer
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 1981;
    },
    unfair: true,
    difficulty: 'hard',
    timing: 2,
    isPlaying: false,
    phrases: {
        guessing: [
            "Ping... ping...",
            ""
        ],
        badGuess: "Miss!",
        otherCorrect: "Hit!",
        thisBotCorrect: "Torpedoed!",
        otherWinGame: "You sunk my battle ship!",
        thisBotWinGame: "Out of your depth."
    }
}

const bot7 = { //TODO: Inte klar
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
        var intervalSize = interval.highestGuess - interval.lowestGuess;
        if (intervalSize < 20) {
            return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess) + interval.lowestGuess);
        }
        this.lastGuess *= doubler;
        this.lastGuess = interval.lowestGuess * this.doubler;
        if(this.lastGuess >= interval.highestGuess) {
            this.lastGuess = interval.highestGuess / this.doubler;
            return this.lastGuess;
        }
        else{
            return this.lastGuess;
        }
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 486;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    phrases: {
        guessing: [
            "Yarr!",
            "Smartly now"
        ],
        badGuess: "Reef sails!",
        otherCorrect: "Blimey!",
        thisBotCorrect: "Ho!",
        otherWinGame: "Scupper that!",
        thisBotWinGame: "Shiver me timbers!"
    }
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
        console.log("wowowo")
        var intervalSize = Math.floor((interval.highestGuess - interval.lowestGuess) * 0.5);
        return Math.floor((Math.random() * intervalSize) + interval.lowestGuess);
        return guess;
    },
    guessAbove: function(interval) {
        console.log("wowowowoowowow 2")
        return interval.lowestGuess + 2006;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    phrases: {
        guessing: [
            "I'm not a bot",
            "Unts-unts-unts"
        ],
        badGuess: "No take-overs allowed!",
        otherCorrect: "I can ban you...",
        thisBotCorrect: "",
        otherWinGame: "",
        thisBotWinGame: "No one can beat our bot"
    }
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
        var guess = (interval.highestGuess - 1 ) - Math.floor(Math.random() * (intervalSize * 0.5));
        return guess;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 777;
    },
    unfair: false,
    difficulty: 'medium',
    timing: 2,
    isPlaying: false,
    behavior: "Looks above for answers, answering in the top half of the interval",
    phrases: {
        guessing: [
            "Proverbs 10:4",
            "Proverbs 21:5",
        ],
        badGuess: "John 1:8",
        thisBotCorrect: "Corinthians 15:57",
        otherCorrect: "Proverbs 3:27",
        otherWinGame: "Ezekiel 25:17",
        thisBotWinGame: "Exodus 20:17"
    }
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
    behavior: "Bides his time and refuses to answer, unless > 20% chance to win",
    phrases: {
        guessing: [
            "...",
            "..."
        ],
        badGuess: "...",
        thisBotCorrect: "Yoink!",
        otherCorrect: "...",
        otherWinGame: "...",
        thisBotWinGame: "B&E!"
    }
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
    behavior: "Copies player's guess and adds 10 or 2 depending on how close to answer",
    phrases: {
        guessing: [
            "00111111",
            "00110001 00110011 00110011 00110111"
        ],
        badGuess: "01001100 01001111 01001100",
        thisBotCorrect: "01000111 01000111",
        otherCorrect: "01010111 01010000",
        otherWinGame: "01010111 01010100 01000110",
        thisBotWinGame: "01001100 00110010 01010000"
    }
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
    behavior: "Wins on a D20",
    phrases: {
        guessing: [
            "I roll my D20..",
            "Let me get my lucky die."
        ],
        badGuess: "Fumble!",
        thisBotCorrect: "Natural 20!",
        otherCorrect: "Random encounter!",
        otherWinGame: "+50 xp!",
        thisBotWinGame: "I put on my robe and wizard hat."
    }
}

export default
[bot1, bot2, bot3, bot4, bot5, bot11, bot6, bot7, bot8, bot9, bot10, bot12]