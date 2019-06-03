import Store from '../store'

const bot1 = {
    name: 'Olle',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        return new Promise((resolve)=>{

            resolve(lowestGuess + 1);

        });

    },
    isPlaying: false,
    behavior: "Adds 1 to lowest possible guess",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot2 = {
    name: 'Kerstin',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;
        let isInInterval = Store.getters.isInInterval;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        return new Promise((resolve)=>{

            if(isInInterval) {

                let intervalSize = highestGuess - lowestGuess;
                if (intervalSize > 10) {
                    resolve(lowestGuess + Math.floor(intervalSize * 0.5));
                }
                resolve(Math.floor(Math.random() * (intervalSize - 1)) + lowestGuess + 1);


            } else {
                resolve(lowestGuess + 250);
            }

        });

    },
    isPlaying: true,
    behavior: "Guesses half-way if <10% chance, then guesses randomly",
    phrases: {
        guessing: [
            "Let's see how this goes.",
            "My turn!"
        ],
        badGuess: "Better luck next time!",
        otherCorrect: "Jolly good!",
        thisBotCorrect: "Lark!",
        otherWinGame: "Well done!",
        thisBotWinGame: "Oh, dearie me, that was fun!"
    },
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot3 = {
    name: 'The La Bossen',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let correctAnswer = Store.getters.getCorrectAnswer;
        let bossLow = correctAnswer * 0.9;
        let bossHigh = correctAnswer * 1.1;

        return new Promise((resolve)=>{

            if(bossLow < lowestGuess && Number.isInteger(lowestGuess)) {
                bossLow = lowestGuess;
            }
            if(bossHigh > highestGuess && highestGuess !== 0 && Number.isInteger(highestGuess)) {
                bossHigh = highestGuess;
            }
            resolve(Math.floor(Math.random() * (bossHigh - 1 - bossLow) + bossLow + 1));

        });

    },
    isPlaying: false,
    behavior: "Guesses between +- 10% of the correct answer",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot4 = {
    name: 'Bo',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let isInInterval = Store.getters.isInInterval;

        return new Promise((resolve)=>{

            if(isInInterval) {
                resolve(Math.floor(Math.random() * (highestGuess - lowestGuess - 1) + lowestGuess + 1));
            } else {
                resolve((lowestGuess + 1) * 2);
            }

        });

    },
    isPlaying: false,
    behavior: "Guesses randomly between highest possible and lowest possible guess",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot5 = {
    name: 'Botinski',
    guess(){

        let correctAnswer = Store.getters.getCorrectAnswer;

        return new Promise((resolve)=>{

            if (Math.floor(Math.random() * 100 + 1) === 10) {
                resolve(correctAnswer);
            }else {
                resolve(Math.floor(Math.random() * 5000 + 1));
            }

        });

    },
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
    behavior: 'Has a 1% chance of guessing correctly, otherwise random number',
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/botinski.jpg',
    description: {
        dislikes: 'Capitalist swine, when bear attack botinski house',
        likes: 'When мама make Borscht-soup, bear traps',
        type: 'Comrade',
        blurb: 'Slightly drunk but proud Soviet citizen'
    }
};

const bot6 =  {
    name: 'Das Boot',
    doubler: Math.random() + 1,
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let isInInterval = Store.getters.isInInterval;

        return new Promise((resolve) => {

            if(isInInterval) {
                resolve(Math.round(((highestGuess - lowestGuess) * 0.1) + 0.3) + lowestGuess);
            } else {
                resolve(lowestGuess + 1981);
            }

        });

    },
    isPlaying: false,
    phrases: {
        guessing: [
            "Ping... ping...",
            "Diving.."
        ],
        badGuess: "Miss!",
        otherCorrect: "Hit!",
        thisBotCorrect: "Torpedoed!",
        otherWinGame: "You sunk my battle ship!",
        thisBotWinGame: "Out of your depth."
    },
    behavior: "Guesses a tenth of the possible interval",
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
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
};

const bot7 = {
    name: 'Segelbot',
    lastGuess: 0,
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let lastGuess = Store.getters.getLastGuess;
        let isInInterval = Store.getters.isInInterval;
        let intervalSize = highestGuess - lowestGuess;
        let answer = 0;

        return new Promise((resolve)=>{

            if(isInInterval) {

                if(lastGuess > highestGuess || lastGuess < lowestGuess){
                    resolve(answer);
                }

                if(intervalSize >= 1000){
                    answer = Math.floor(lowestGuess + intervalSize * 0.8);

                } else if (intervalSize >= 100){
                    answer = Math.floor(lowestGuess + intervalSize * 0.5);

                } else if (intervalSize >= 10){
                    answer = Math.floor(lowestGuess + intervalSize * 0.2);

                } else {
                    answer = lowestGuess + 1;
                }

                resolve(answer);

            } else {
                resolve(lowestGuess + 486);
            }

        });

    },
    isPlaying: true,
    behavior: "The smaller the interval, the smaller percentage it's guesses are",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
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
};

const bot8 = {
    name: 'Anna',
    lastGuess: 0,
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let isInInterval = Store.getters.isInInterval;
        let intervalSize = Math.floor((highestGuess - lowestGuess) * 0.5);

        return new Promise((resolve)=>{

            if(isInInterval) {
                resolve(Math.floor((Math.random() * (intervalSize - 1)) + lowestGuess + 1));
            } else {
                resolve(lowestGuess + 2006);
            }

        });

    },
    isPlaying: false,
    phrases: {
        guessing: [
            "Jag är ingen bot",
            "Ingen kan slå våran bot."
        ],
        badGuess: "No take-overs allowed!",
        otherCorrect: "I can ban you...",
        thisBotCorrect: "",
        otherWinGame: "",
        thisBotWinGame: "No one can beat our bot"
    },
    behavior: 'Guesses randomly within the lower half of the interval',
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/anna.jpg',
    description: {
        dislikes: 'Trolls, spambots',
        likes: "Banning, watching over her channel, mid-2000's pop songs",
        type: 'Moderator',
        blurb: 'A very, very beautiful girl that can ban you very, very hard'
    }
};

const bot9 = {
    name: 'Abbot',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let isInInterval = Store.getters.isInInterval;
        let intervalSize = highestGuess - lowestGuess;

        return new Promise((resolve)=>{

            if(isInInterval) {
                resolve((highestGuess - 1 ) - Math.floor(Math.random() * (intervalSize * 0.5)));
            } else {
                resolve(lowestGuess + 777);
            }

        });

    },
    isPlaying: false,
    behavior: "Answers within the top half of the interval",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot10 = {
    name: 'Inbotstjuven',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let intervalSize = highestGuess - lowestGuess;

        return new Promise((resolve)=>{

            if(intervalSize > 0 && intervalSize <= 10) {
                resolve(Math.floor(Math.random() * (highestGuess - lowestGuess - 1) + lowestGuess + 1));
            }
            return 0;

        });

    },
    isPlaying: false,
    behavior: "Refuses to answer, unless > 10% chance to win",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '/botImg/inbotstjuven.jpg',
    description: {
        dislikes: 'Alarms, the Police, angry dogs',
        likes: 'Unlocked car-doors, crowbars, balaclavas',
        type: 'Burglar',
        blurb: 'Hides in the shadows, waiting for the right opportunity to strike'
    }
};

const bot11 = {
    name: 'CopyBot',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let lastGuess = Store.getters.getLastGuess;
        let isInInterval = Store.getters.isInInterval;
        let intervalSize = highestGuess - lowestGuess;

        return new Promise((resolve)=>{

            if(isInInterval) {

                if (intervalSize > 30) {
                    resolve(lastGuess + 10);
                } else {
                    resolve(lastGuess + 1);
                }

            } else {
                resolve(lowestGuess + 10);
            }

        });

    },
    isPlaying: false,
    behavior: "Copies player's guess and adds 10 or 2 to it",
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot12 = {
    name: 'Dungeon Master',
    guess(){

        let correctAnswer = Store.getters.getCorrectAnswer;

        return new Promise((resolve)=>{

            if(Math.floor(Math.random() * 20 + 1) === 20) {
                resolve(correctAnswer);

            } else resolve(-1);

        });

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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '../botImg/dungeonMaster.jpg',
    description: {
        dislikes: 'Critical failures, interrupted game nights',
        likes: "Nat 20's, Pizza rolls, cool robes",
        type: 'Dice thrower',
        blurb: "Rolls his dice and lets faith decide"
    }
};


const bot13 = {
    name: "Not a bot",
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let correctAnswer = Store.getters.getCorrectAnswer;
        let max = 0;
        let min = 0;

        return new Promise((resolve)=>{

            if(highestGuess === 0 || highestGuess > Math.ceil(correctAnswer * 1.4)){
                max = Math.ceil(correctAnswer * (1.4));
            } else {
                max = highestGuess;
            }

            if(lowestGuess === 0 || lowestGuess < Math.floor(correctAnswer * 0.6)){
                min = Math.floor(correctAnswer * (0.6));
            } else {
                min = lowestGuess;
            }


            resolve(Math.floor(Math.random() * ((max - min) - 1)) + min + 1);

        });

    },
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
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
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
};

const bot14 = {
    name: 'BratBot',
    guess(){

        let lowestGuess = Store.getters.getLowGuess;
        let highestGuess = Store.getters.getHighGuess;

        if (lowestGuess === ''){
            lowestGuess = 0;
        }

        if (highestGuess === ''){
            highestGuess = 0;
        }

        let correctAnswer = Store.getters.getCorrectAnswer;
        let bratLow = correctAnswer * 0.75;
        let bratHigh = correctAnswer * 1.25;

        return new Promise((resolve)=>{

            if(bratLow < lowestGuess && Number.isInteger(lowestGuess)) {
                bratLow = lowestGuess;
            }

            if(bratHigh > highestGuess && highestGuess !== 0 && Number.isInteger(highestGuess)) {
                bratHigh = highestGuess;
            }

            resolve(Math.floor(Math.random() * (bratHigh - 1 - bratLow) + bratLow + 1));

        });

    },
    isPlaying: false,
    behavior: "Guesses within 25% of the correct answer. Cheats",
    phrases: {
        guessing: [
            "LAZORZ",
            "1337"
        ],
        badGuess: "gg n00b",
        otherCorrect: "urmom",
        thisBotCorrect: "l2p",
        otherWinGame: "fml",
        thisBotWinGame: "lmao haxzorz"
    },
    soundFx: {
        guessingSfx: '/soundfx/botTest1.wav',
        badGuessSfx: '/soundfx/botTest1.wav',
        otherCorrectSfx: '/soundfx/botTest1.wav',
        thisBotCorrectSfx: '/soundfx/botTest1.wav',
        otherWinGameSfx:'/soundfx/botTest1.wav',
        thisBotWinGameSfx: '/soundfx/botTest1.wav'
    },
    answer: "",
    guessCount: 0,
    isHuman: false,
    score: 0,
    correctAnswer: 0,
    imgSrc: '../botImg/brat.jpg',
    description: {
        dislikes: 'When you steal his frags, cooties, old people music.',
        likes: 'Candy, stealing your frags, screaming.',
        type: 'Brat',
        blurb: "Like, whatever, you're not my mom!"
    }
};

export default
 [bot1, bot2, bot3, bot4, bot5, bot6, bot7, bot8, bot9, bot10, bot11, bot12, bot13, bot14]
