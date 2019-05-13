import { stat } from "fs";
import axios from "axios";
import store from '../store'
import GameComplete from "../components/GameComplete";
import router from "../router";


const state = {
    activePlayers: [],
    questions: [

    ],
    players: [{
        name: "Player One",
        answer: 0,
        guessCount: 0
    },
    {
        name: "Player Two",
        answer: 0,
        guessCount: 0
    }],
    currentQuestion: "",
    startStage: true,
    isRunning: false,
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

    ]
}

const getters = {
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
    getIsRunning: state => {
        return state.isRunning;
    },
    getStartStage: state => {
        return state.startStage;
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
        console.log("last guess::: "+state.lastGuess)
        return state.lastGuess;
    }
}

const mutations = {
    setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions),

    startGame: state => {
        state.startStage = false;
        state.isRunning = true;
        state.currentQuestion = state.questions[state.questionCounter].question;
    },
    submitAnswer: (state, a) => {
        a = parseInt(a);
        state.lastGuess = a;
        state.players[state.playerTurn].answer = a;
        // state.lastGuess = state.players[state.playerTurn];
        if (state.players[state.playerTurn].answer == state.questions[state.questionCounter].answer) {
            state.lastGuess = '';
            state.players[state.playerTurn].guessCount += 1;

            if (state.questionCounter === state.questions.length) {
                state.questionCounter = 0;
            }
            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
            state.questionCounter += 1;
            state.lowAnswers = [];
            state.highAnswers = [];

            if(state.questionCounter === state.questions.length){
               router.push('/complete')
            }

            state.playerTurn += 1;
            state.currentQuestion = state.questions[state.questionCounter].question;

            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
            store.dispatch('generalStats/postDBData', [1, 2]);
        }
        else if (state.players[state.playerTurn].answer < state.questions[state.questionCounter].answer) {
            console.log('Your answer is to low');
            state.players[state.playerTurn].guessCount += 1;

            state.lowAnswers.push(state.players[state.playerTurn].answer);
            state.lowAnswers.sort((a, b) => {
                if(a > b) return -1;
                if(b < a) return 1;
                return 0;
            });

            state.playerTurn += 1;

            
            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
        }
        else if (state.players[state.playerTurn].answer > state.questions[state.questionCounter].answer) {

            console.log('Your answer is to high');
            state.players[state.playerTurn].guessCount += 1;

            state.highAnswers.push(state.players[state.playerTurn].answer);
            state.highAnswers.sort((a, b) => {
                if(a > b) return 1;
                if(b > a) return -1;
                return 0;
            });

            state.playerTurn += 1;

            
            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
        }


    },
    updateAnswer: (state, a) => {
        state.answer = a;
    }
}

const actions = {
    async loadQuestionsAndStartGame({commit}, settings) {
        console.log("hello")
        const response = await axios.get(
            `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
        );
        console.log("hello2")
        console.log(response.data)
        commit('setQuestions', response.data);
        commit("startGame");
    },

    updateAnswer: ({
        commit
    }, a) => {
        commit('updateAnswer', a);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}