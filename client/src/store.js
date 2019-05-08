import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [{
        id: 0,
        question: 'What year was Öyvin born',
        answer: 1984,
        status: true

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
    activeQuestion: [],

    answeredQuestions: [{

    }],
    lowAnswers:[{

    }],
    highAnswers:[{

    }]
  },
  getters: {
    getQuestions: state => {
        return state.questions;
      }
  },
  mutations: {

  },
  actions: {

  }
})