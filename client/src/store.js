import Vue from 'vue'
import Vuex from 'vuex'
import questions2 from "./modules/questions2"
import game from "./modules/game"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [{
        id: 0,
        question: 'What year was Öyvin born',
        answer: 1984,
        status: false

      },
      {
        id: 1,
        question: 'What year was Filip born',
        answer: 1995,
        status: false
      },
      {
        id: 2,
        question: 'How many players are there in a soccer game',
        answer: 22,
        status: false
      }
    ],
        currentQuestion: "",
        startStage: true,
        isRunning: false,
        answerAttempts: 0,
        answer: "",
        questionCounter: 0,

    answeredQuestions: [{

    }],
    lowAnswers:[

    ],
    highAnswers:[
      
    ],
    answers:[

    ]
  },
  getters: {
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
    }
  },

  mutations: {
    startGame: state => {
        state.startStage = false;
        state.isRunning = true;
        state.currentQuestion = state.questions[state.questionCounter].question;
    },
    submitAnswer: state => {
        if (state.answer == state.questions[state.questionCounter].answer) {
            state.questionCounter++;
            if (state.questionCounter === state.questions.length) {
                state.questionCounter = 0;
            }
            state.currentQuestion = state.questions[state.questionCounter].question;
        }
        else {
            alert('You fucked up (This profanity is for testing purposes only :)');
        }
        state.answer = '';
    },
    updateAnswer: (state, a) => {
        state.answer = a;
    }

  },
  actions: {
    updateAnswer: ({commit}, a) => {
        commit('updateAnswer', a);
    }
  }
})