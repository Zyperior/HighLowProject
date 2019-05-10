import { stat } from "fs";
import axios from "axios";
import store from '../store'


const state = {
    questions: [

    ],
    players: [{
        name: "Player One",
        answer: 0
    },
    {
        name: "Player Two",
        answer: 0
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
        state.players[state.playerTurn].answer = a;
        state.lastGuess = state.players[state.playerTurn];
        if (state.players[state.playerTurn].answer == state.questions[state.questionCounter].answer) {


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
                alert('Game over');
            }

            state.playerTurn += 1;
            state.currentQuestion = state.questions[state.questionCounter].question;

            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
            store.dispatch('generalStats/postDBData', [1, 2]);
        }
        if (state.players[state.playerTurn].answer < state.questions[state.questionCounter].answer) {
            console.log('Your answer is to low');
            state.lowAnswers.push(state.players[state.playerTurn].answer);
            state.lowAnswers.reverse();
            console.log(state.lowAnswers);
            state.playerTurn += 1;
            console.log('The last guess was', state.lastGuess);
            
            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
        }
        if (state.players[state.playerTurn].answer > state.questions[state.questionCounter].answer) {
            console.log('Your answer is to high');

            state.highAnswers.push(state.players[state.playerTurn].answer);
            state.highAnswers.sort();
            console.log(state.highAnswers);
            state.playerTurn += 1;
            console.log('The last guess was', state.lastGuess);
            
            if(state.playerTurn === 2){
                state.playerTurn = 0;
            }
        }

        state.answer = '';
    },
    updateAnswer: (state, a) => {
        state.answer = a;
    }
}

const actions = {
    async loadQuestionsAndStartGame({commit}, settings) {

        const response = await axios.get(
            `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
        );
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