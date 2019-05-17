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

    isGameRunning: false,
    displayGameCompleteResults: false,


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

    getDisplayGameCompleteResults: state => {
        return state.displayGameCompleteResults;
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
        state.lastGuess = a;
        state.activePlayers[state.playerTurn].answer = a;
        state.answer = "";

        if (state.activePlayers[state.playerTurn].answer == state.questions[state.questionCounter].answer) {

            var audioCorrectAnswer = new Audio('/correctAnswer.wav');
            audioCorrectAnswer.play();


            setTimeout(function () {

                state.lastGuess = '';
                state.activePlayers[state.playerTurn].guessCount += 1;
                state.questionCounter++;

                if(state.playerTurn === state.activePlayers.length){
                    state.playerTurn = 0;
                }

                state.lowAnswers = [];
                state.highAnswers = [];


                if(state.questionCounter === state.questions.length){
                    state.isGameRunning = false;
                    state.questionCounter = 0;
                    store.dispatch('generalStats/postDBData', [1, 2]);
                    router.push('/complete');
                    state.displayGameCompleteResults = true;
                }

                state.playerTurn += 1;
                state.currentQuestion = state.questions[state.questionCounter].question;

                if(state.playerTurn === state.activePlayers.length){
                    state.playerTurn = 0;
                }



            }, 3000);





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

        context.commit("startGame");

        context.commit("startTimer", {root:true});

    },


    submitAnswer(context, a) {


        if(parseInt(a) == state.questions[state.questionCounter].answer){
            context.commit("stopTimer", {root: true})
            setTimeout(function () {
                context.commit("startTimer", {root: true});
            }, 3000)
        }
        else{
            context.commit("stopTimer", {root: true});
            context.commit("startTimer", {root: true});
        }
        

        context.commit("submitAnswer", a);



    }
    
}






export default {
    state,
    getters,
    mutations,
    actions
}