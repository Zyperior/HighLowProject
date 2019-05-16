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
    },
    answer: "",
    guessCount: 0,
    correctAnswer: 0,
    isHuman: false,
    score: 0,
    imgSrc: "botImg/olle.jpg",
    description: {
        dislikes: 'Reading rules',
        likes: 'Yelling',
        type: 'Confused',
        blurb: "A very confused man. Why is he even here?"
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
        }
        return Math.floor(Math.random() * (intervalSize - 1)) + interval.lowestGuess + 1;
    },
    guessAbove: function(interval) {
        return interval.lowestGuess + 250;
    },
    unfair: false,
    difficulty: 'hard',
    timing: 2,
    isPlaying: true,
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/kerstin.jpg',
    description: {
        dislikes: 'Mean people',
        likes: 'Baking pies, hard candy, pinching cheeks',
        type: "Retired ol' woman",
        blurb: "Sweet old lady that wishes you well"
    }
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/deLaBossen.jpg',
    description: {
        dislikes: 'Snitches, disrespect',
        likes: 'Family, his business, a nice cigar',
        type: 'Boss',
        blurb: 'Mafia boss with style, has contacts all over Italy'
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
        return Math.floor(Math.random() * (interval.highestGuess - interval.lowestGuess - 1) + interval.lowestGuess + 1);
    },
    guessAbove: function(interval) {
       return interval.lowestGuess * 2;
    },
    unfair: false,
    difficulty: 'easy',
    timing: 2,
    isPlaying: false,
    behavior: "Guesses randomly between highest and lowest guess",
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/bo.jpg',
    description: {
        dislikes: 'When his children are too busy to visit their old man',
        likes: 'Having fun, watching Jeopardy, fishing',
        type: "Retired ol' man",
        blurb: "An old man that's just happy to be here"
    }
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
    },
    behavior: 'Has a 1% chance of guessing correctly, otherwise guesses a random number between 1-5000',
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/botinski.png',
    description: {
        dislikes: 'Capitalist swine, when bear attack botinski house',
        likes: 'When мама make Borscht-soup, bear traps',
        type: 'Comrade',
        blurb: 'Slightly drunk but proud Soviet citizen'
    }
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
    },
    behavior: 'The smaller the interval is the smaller its guesses are',
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/submarine.jpg',
    description: {
        dislikes: 'Not going fast underwater',
        likes: 'Going fast underwater',
        type: 'Submarine',
        blurb: 'Is literally a submarine'
    }
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
    isPlaying: true,
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
    },
    behavior: 'If interval > 1000, it guesses four fifths of that, if between 100 and 1000 it guesses half, if between 10 and 100 it guesses a fifth, else it guesses 1',
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/segelBot.jpg',
    description: {
        dislikes: 'Scurvy',
        likes: 'Treasure chests, singing songs, friendship',
        type: 'Pirate',
        blurb: 'A thief of the sea, living the high-life with a bottle of rum'
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
    },
    behavior: 'Looks down below for an answer, guesses randomly within the lower half of the interval',
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/anna.jpg',
    description: {
        dislikes: 'Trolls',
        likes: 'Banning, watching over her channel',
        type: 'Moderator',
        blurb: 'A very, very beautiful girl that can ban you so hard'
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
        return (interval.highestGuess - 1 ) - Math.floor(Math.random() * (intervalSize * 0.5));
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/abbot.jpg',
    description: {
        dislikes: 'Sinners, paying taxes',
        likes: 'The good book, a nice sunday dinner',
        type: 'Preacher',
        blurb: 'A man of faith preaching to his flock'
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/inbotstjuven.jpg',
    description: {
        dislikes: 'Alarms, the Police',
        likes: 'Unlocked car-doors, crowbars',
        type: 'Burglar',
        blurb: 'Hides in the shadows, waiting for the right opportunity to strike'
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
        if (intervalSize > 30) {
            return interval.lastGuess + 10;
        } else
            return interval.lastGuess + 1;
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '../botImg/copyBot.jpg',
    description: {
        dislikes: 'Water, dreaming',
        likes: 'Algorithms, wires, copying you',
        type: 'Robot',
        blurb: "01001001 00100000 01100001 01101101 00100000 01110010 01101111 01100010 01101111 01110100"
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
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '../botImg/dungeonMaster.png',
    description: {
        dislikes: 'Critical failures, interrupted game nights',
        likes: "Nat 20's, Pizza rolls, cool robes",
        type: 'Dice thrower',
        blurb: "Rolls his dice and lets faith decide"
    }
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
    behavior: "Guesses suspiciously life like...",
    phrases: {
        guessing: [
            "This must be it!",
            "Hmm..."
        ],
        badGuess: "...",
        thisBotCorrect: "I knew it!",
        otherCorrect: "That would had been my next guess...",
        otherWinGame: "Congrats",
        thisBotWinGame: "Horray!"
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '../botImg/humanBot.jpg',
    description: {
        dislikes: 'Not breathing, diseases',
        likes: 'Food, water, watching the big game',
        type: 'Human',
        blurb: 'A very normal human that is in no way a bot'
    }
}

export default
 [bot1, bot2, bot3, bot4, bot5, bot11, bot6, bot7, bot8, bot9, bot10, bot12, bot13]