import store from '../store';
import questionsDB from './questionsDB';
import router from "../router";
import {getCurrentSettings} from './settingsData'

const POINT_FACTOR = 100;
const POINT_DEC_PERCENT = 0.01;

const CORRECT_ANSWER = true;
const INCORRECT_ANSWER = false;

export default {

    state : {
        gameRunning: false,
        gameCompleted: false,
        startTimer: false,
        muteSound: false,
        chattyBots: true,
        players: [],
        questions: [],
        lowGuess: '',
        highGuess: '',
        lastGuess: '',
        botLoopTimeoutFunction: '',
        speechToTextLanguage: '',
        currentQuestion: { question: '', answer: '', points: 0, value: 0 },
        guessCount: 0,
        answerAttempts: 0,
        questionCounter: 0,
        playerTurn: 0
    },

    getters : {
        isStartTimer: state => { return state.startTimer },
        isMuteSound: state => { return state.muteSound },
        isGameCompleted: state => { return state.gameCompleted },
        isGameRunning: state => { return state.gameRunning },
        getPlayerTurn: state => { return state.playerTurn },
        getCorrectAnswer: state => { return state.currentQuestion.answer },
        getCurrentQuestion: state => { return state.currentQuestion.question },
        getLowGuess: state => { return state.lowGuess },
        getHighGuess: state => { return state.highGuess },
        getLastGuess: state => { return state.lastGuess },
        getPlayers: state => { return state.players },
        getBotLoopTimeoutFunction: state => { return state.botLoopTimeoutFunction }
    },
    mutations : {

        setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions),

        startGame: state => {
            state.gameRunning = true;
            state.startTimer = true;
        },

        setNextQuestion: state => {
            state.currentQuestion.question = state.questions[state.questionCounter].question;
            state.currentQuestion.answer = state.questions[state.questionCounter].answer;
            state.currentQuestion.points = state.questions[state.questionCounter].difficulty * POINT_FACTOR;
            state.currentQuestion.value = state.questions[state.questionCounter].difficulty * POINT_FACTOR;
        },

        incPlayerTurn: state => {
            state.playerTurn++;
            if(state.playerTurn >= state.players.length){
                state.playerTurn = 0;
            }
        },

        setClosestHighAnswer:  (state, answer) => {
            if(state.highGuess === '' || state.highGuess > answer){
                state.highGuess = answer;
            }
        },

        setClosestLowAnswer:  (state, answer) => {
            if( (state.lowGuess === '' && answer >= 0) || state.lowGuess < answer){
                state.lowGuess = answer;
            }
        },

        resetLowestAndHighestAnswers: state => { state.lowGuess = ''; state.highGuess = '' },

        incQuestionCounter: state => { state.questionCounter++ },

        resetQuestionCounter: state => { state.questionCounter = 0},

        incPlayerCorrectAnswers: state => { state.players[state.playerTurn].correctAnswer++ },

        incPlayerScore: state => { state.players[state.playerTurn].score += state.currentQuestion.value },

        incPlayerGuessCount: state => { state.players[state.playerTurn].guessCount++ },

        decQuestionValue: state => {
            state.currentQuestion.value -= (state.currentQuestion.points * (state.guessCount * POINT_DEC_PERCENT))
        },

        setLastGuess: (state, answer) => { state.lastGuess = answer },

        resetLastGuess: state => { state.lastGuess = '' },

        incGuessCounter: state => { state.guessCount++ },

        resetGuessCounter: state => { state.guessCount = 0 },

        incAnswerAttempts: state => { state.answerAttempts++ },

        setPlayers: (state, players) => { state.players = players; },

        muteSound: state => { state.muteSound = !state.muteSound },

        resetPlayersBeforeNewGame: state => { state.players = []; },

        stopGame: state => { state.isGameRunning = false },

        displayResults: state => { state.gameCompleted = true; },

        resetPlayerAnswers: state => { state.players.forEach(player => { player.answer = ""});},

        setPlayerAnswer: (state, answer) => { state.players[state.playerTurn].answer = answer; },

        //Vet ej vad dessa två gör, låter dem ligga tills vidare /Andreas
        breakOutOfBotLoop: (state) => (clearTimeout(state.botLoopTimeoutFunction)),
        setBotTimeoutFunction: (state, timeoutFunction) => (state.botLoopTimeoutFunction = timeoutFunction),
    },
    actions : {

        async loadGame({commit}) {

            // Load players from current settings, (see action below)..
            await this.dispatch('loadPlayerSetup', commit).then( (players) => {

                // ..set the players array
                commit('setPlayers', players);

                // Load questions from DB with current settings, (see questionsDB-module)..
                questionsDB.getQuestions(getCurrentSettings().questions)

                // ..then create player indexes for player cards and set questions array..
                .then( (questions) => {
                    store.commit("createPlayerIndexes");
                    commit('setQuestions', questions);

                // Then set first question and start game
                }).then( () => {
                        commit('setNextQuestion');
                        commit("startGame");
                })
            });

        },

        async loadPlayerSetup({commit}) {

            commit('resetPlayersBeforeNewGame');

            return new Promise( (resolve) => {

                // Add playing bots to array
                const players = store.getters.playingBots.slice();

                // If user is logged in, make User main-player, otherwise make Guest main-player
                let username = "Guest";
                if(window.$cookies.isKey('userData')){
                   username = window.$cookies.get('userData').username;
                    }
                const player = {
                    name: username,
                    score: 0,
                    guessCount: 0,
                    isHuman: true,
                    correctAnswer: 0,
                    isUser: store.getters['userStats/getIsLoggedIn'],
                    answer: ""
                }
                players.push(player);

                // Create players from current settings and add to array
                for(let i = 2; i <= getCurrentSettings().playerAmount+1; i++){
                    let player = {
                        name: 'Player '+i,
                        score: 0,
                        guessCount: 0,
                        correctAnswer: 0,
                        isHuman: true,
                        isUser: false,
                        answer: ""
                    };
                    players.push(player);
                }

                // Shuffle array
                if(getCurrentSettings().shufflePlayers){

                    for(let i = players.length - 1; i >= 0; i--){
                        let rand = Math.floor(Math.random() * i);
                        let temp = players[i];
                        players[i] = players[rand];
                        players[rand] = temp;
                    }

                }

                resolve(players);

            });
        },

        async submitAnswer({state, commit, dispatch}, submittedAnswer) {

            let correctAnswer = state.currentQuestion.answer;
            let answer = parseInt(submittedAnswer);

            commit('incAnswerAttempts');
            commit('setLastGuess', answer);
            commit("stopTimer", {root: true});

            // First check if answer was correct, below or above and mutate the state accordingly..
            this.dispatch('checkAnswer', [answer, correctAnswer])

            // ..then end the game, go to next question or go to next player
            .then( (answerWasCorrect) => {
                if(answerWasCorrect){

                    if (!state.muteSound){
                        // noinspection JSIgnoredPromiseFromCall
                        new Audio('/soundfx/correctAnswer.wav').play();
                    }

                    if(state.questionCounter >= state.questions.length){
                        dispatch('endGame');
                    } else {
                        commit('setNextQuestion');
                        commit('incPlayerTurn');
                        commit("startTimer", {root: true});
                        store.commit("flipCards");
                    }

                } else {

                    commit('incPlayerTurn');
                    commit("startTimer", {root: true});
                    store.commit("flipCards");

                }

            });


        },

        checkAnswer({state, commit}, [answer, correctAnswer]){

            return new Promise( (resolve) => {

                if(answer === correctAnswer){

                    commit('incPlayerCorrectAnswers');
                    commit('incPlayerScore');
                    commit('incPlayerGuessCount');
                    commit('incQuestionCounter');
                    commit('resetGuessCounter');
                    commit('resetLowestAndHighestAnswers');
                    commit("resetPlayerAnswers");

                    resolve(CORRECT_ANSWER)
                }
                if(answer < correctAnswer){

                    commit('setClosestLowAnswer', answer);
                    commit('incGuessCounter');
                    commit('incPlayerGuessCount');
                    commit('decQuestionValue');
                    commit("setPlayerAnswer", answer);

                    resolve(INCORRECT_ANSWER)
                }

                if(answer > correctAnswer){

                    commit('setClosestHighAnswer', answer);
                    commit('incGuessCounter');
                    commit('incPlayerGuessCount');
                    commit('decQuestionValue');
                    commit("setPlayerAnswer", answer);

                    resolve(INCORRECT_ANSWER);
                }


            })
        },

        endGame({state, commit}){

            store.dispatch('generalStats/postDBData', [state.questions.length, state.answerAttempts]);

            state.players.forEach(p => {

                if(!(p.isHuman)) {

                    store.dispatch('botStats/updateBotStats',
                        [p.name, p.score, 1, p.guessCount, p.correctAnswer])

                }else if(p.isUser){
                    console.log(p.correctAnswer);
                    store.dispatch('userStats/updateUser', [p.name, p.guessCount, p.score, p.correctAnswer])
                }

            });

            router.push('/complete');
            commit('displayResults');

            commit('resetLastGuess');
            commit('stopGame');
            commit('resetQuestionCounter')


        }
    }
}
