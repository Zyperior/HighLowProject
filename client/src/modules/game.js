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

    isGameRunning: false

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
    getIsGameRunning: state => {
        return state.isGameRunning;
    }
}

const mutations = {
    setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions),

    startGame: state => {
        state.isGameRunning = true;
        state.startTimer = !state.startTimer;
        state.currentQuestion = state.questions[state.questionCounter].question;
        state.currQ.question = state.questions[state.questionCounter].question;
        state.currQ.currQAnswer = state.questions[state.questionCounter].answer;
        state.currQ.points = state.questions[state.questionCounter].difficulty * 100;
    },
    submitAnswer: (state, a) => {
        a = parseInt(a);
        state.lastGuess = a;
        state.activePlayers[state.playerTurn].answer = a;
        state.answer = "";

        if (state.activePlayers[state.playerTurn].answer == state.questions[state.questionCounter].answer) {
            var audioCorrectAnswer = new Audio('/correctAnswer.wav');
            audioCorrectAnswer.play();
            state.lastGuess = '';
            state.activePlayers[state.playerTurn].guessCount += 1;
            state.questionCounter++;
            // if (state.questionCounter === state.questions.length) {
            //     state.questionCounter = 0;
            // }
            if(state.playerTurn === state.activePlayers.length){
                state.playerTurn = 0;
            }

            state.lowAnswers = [];
            state.highAnswers = [];


            if(state.questionCounter === state.questions.length){
                state.questionCounter = 0;
                store.dispatch('generalStats/postDBData', [1, 2]);
                router.push('/complete');
                state.isGameRunning = false;
            }

            state.playerTurn += 1;
            state.currentQuestion = state.questions[state.questionCounter].question;

            if(state.playerTurn === state.activePlayers.length){
                state.playerTurn = 0;
            }

        }
        else if (state.activePlayers[state.playerTurn].answer < state.questions[state.questionCounter].answer) {
            state.activePlayers[state.playerTurn].guessCount += 1;

            state.lowAnswers.push(state.activePlayers[state.playerTurn].answer);
            state.lowAnswers.sort((a, b) => {
                if(a > b) return -1;
                if(b < a) return 1;
                return 0;
            });

            state.playerTurn += 1;

            
            if(state.playerTurn === state.activePlayers.length){
                state.playerTurn = 0;
            }
        }
        else if (state.activePlayers[state.playerTurn].answer > state.questions[state.questionCounter].answer) {


            state.activePlayers[state.playerTurn].guessCount += 1;

            state.highAnswers.push(state.activePlayers[state.playerTurn].answer);
            state.highAnswers.sort((a, b) => {
                if(a > b) return 1;
                if(b > a) return -1;
                return 0;
            });

            state.playerTurn += 1;

            
            if(state.playerTurn === state.activePlayers.length){
                state.playerTurn = 0;
            }
        }


    },
    updateAnswer: (state, a) => {
        state.answer = a;
    },
    

        

    updateActivePlayers: (state, players) => {
        state.activePlayers = state.players.concat(players);
    },

    resetPlayersBeforeNewGames: (state) => {
        state.players = [];
        state.activePlayers.forEach(activePlayer => activePlayer.answer = "");
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
    actions
}