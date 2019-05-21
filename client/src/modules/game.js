import { stat } from "fs";
import axios from "axios";
import store from '../store'
import GameComplete from "../components/GameComplete";
import router from "../router";


const state = {
    activePlayers: [],
    questions: [

    ],
    players: [
      ],
    currentQuestion: "",
    currQ: {
      question: "", currQAnswer: "", points: 0
    },
    startTimer: false,
    answerAttempts: 0,
    answer: "",
    questionCounter: 0,
    playerTurn: 0,
    lastGuess: 0,
    answeredQuestions: [{

    }],
    lowAnswers: [

    ],
    highAnswers: [

    ],
    answers: [

    ],
    muteSound: false,
    isGameRunning: false,
    displayGameCompleteResults: false,
    botLoopTimeoutFunction: ""

}

const getters = {
    getPlayerTurn: state => {
      return state.playerTurn;
    },
    correctAnswer: state => {
        if(state.questions.length > 0)
        return state.questions[state.questionCounter].answer;
        else
            return "No";
    },
    getCurrentQuestion: state => {
        return state.currentQuestion;
    },
    getAnswer: state => {
        return state.answer;
    },

    getStartTimer: state => {
        return state.startTimer;
    },
    getLowGuess: state => {
        return state.lowAnswers;
    },
    getHighGuess: state => {
        return state.highAnswers;
    },
    getPlayers: state => {
        return state.players;
    },
    getLastGuess: state => {
        return state.lastGuess;
    },
    getActivePlayers: state => {
        return state.activePlayers.reverse();
    },
    getMuteSound: state => {
        return state.muteSound;
    },

    getDisplayGameCompleteResults: state => {
        return state.displayGameCompleteResults;
    },
    getIsGameRunning: state => {
        return state.isGameRunning;
    },
    getBotLoopTimeoutFunction: state => {
        return state.botLoopTimeoutFunction;
}
}

const mutations = {
    setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions),

    breakOutOfBotLoop: (state) => (clearTimeout(state.botLoopTimeoutFunction)),
    setBotTimeoutFunction: (state, timeoutFunction) => (state.botLoopTimeoutFunction = timeoutFunction),

    startGame: state => {
        state.isGameRunning = true;
        state.startTimer = !state.startTimer;
        state.playerTurn = 0;
        state.lowAnswers = [];
        state.highAnswers = [];
        state.displayGameCompleteResults = false;
        state.currentQuestion = state.questions[state.questionCounter].question;
        state.currQ.question = state.questions[state.questionCounter].question;
        state.currQ.currQAnswer = state.questions[state.questionCounter].answer;
        state.currQ.points = state.questions[state.questionCounter].difficulty * 100;
    },
    submitAnswer: (state, a) => {
        a = parseInt(a);
        var player = state.activePlayers[state.playerTurn];
        state.lastGuess = a;
        player.answer = a;
        state.answer = "";
        player.guessCount++;

        if (state.activePlayers[state.playerTurn].answer == state.questions[state.questionCounter].answer) {
            state.lastGuess = '';
            if (!state.muteSound){
                let audioCorrectAnswer = new Audio('/soundfx/correctAnswer.wav');
                audioCorrectAnswer.play();
            }

            player.correctAnswer += 1;
            state.questionCounter++;

            state.lowAnswers = [];
            state.highAnswers = [];


            if(state.questionCounter === state.questions.length){
                state.isGameRunning = false;
                state.questionCounter = 0;
                store.dispatch('generalStats/postDBData', [1, 2]);
                state.activePlayers.forEach(p => {
                    if(!(p.isHuman)){
                        store.dispatch('botStats/updateBotStats', [p.name, p.score, 1, p.guessCount, p.correctAnswer])
                    }else{
                        //store player data
                    }
                })

                router.push('/complete');
                state.displayGameCompleteResults = true;
            }

            state.currentQuestion = state.questions[state.questionCounter].question;


        }
        else if (state.activePlayers[state.playerTurn].answer < state.questions[state.questionCounter].answer) {

            state.lowAnswers.push(state.activePlayers[state.playerTurn].answer);
            state.lowAnswers.sort((a, b) => {
                if(a > b) return -1;
                if(b < a) return 1;
                return 0;
            });

        }
        else if (state.activePlayers[state.playerTurn].answer > state.questions[state.questionCounter].answer) {


            state.activePlayers[state.playerTurn].guessCount += 1;

            state.highAnswers.push(state.activePlayers[state.playerTurn].answer);
            state.highAnswers.sort((a, b) => {
                if(a > b) return 1;
                if(b > a) return -1;
                return 0;
            });

            }
            state.playerTurn += 1;

            if(state.playerTurn === state.activePlayers.length){
                state.playerTurn = 0;



        }


    },
    updateAnswer: (state, a) => {
        state.answer = a;
    },
    

        

    updateActivePlayers: (state, players) => {
        state.activePlayers = state.players.concat(players);
    },
    muteSound: state => {
        state.muteSound = !state.muteSound;
    },

    resetPlayersBeforeNewGames: (state) => {
        state.players = [];
        state.activePlayers = [];
        state.activePlayers.forEach(activePlayer => activePlayer.answer = "");
    },

    stopGame: state => (state.isGameRunning = false)




}

const actions = {
    async loadQuestionsAndStartGame({commit}, settings) {
        const response = await axios.get(
            `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
        );
        commit('setQuestions', response.data);
        commit("startGame");
    },

    updateAnswer: ({commit}, a) => {
        commit('updateAnswer', a);
    },



    startGame(context) {

        console.log("actions startGame");
        

        context.commit("startGame");

        context.commit("startTimer", {root:true});

    },


    submitAnswer(context, a) {


        

        context.commit("submitAnswer", a);

        context.commit("stopTimer", {root: true});

        context.commit("startTimer", {root: true});

    }
    
}






export default {
    state,
    getters,
    mutations,
    actions,

}