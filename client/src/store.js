import Vue from 'vue'
import Vuex from 'vuex'

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

    answeredQuestions: [{

    }]
  },
  getters: {
    getQuestions: state => {

      for (let i = 0; i < state.questions.length; i++) {
        const element = state.questions[i];

        return state.questions[i].question;
      }

    }
  },

  mutations: {


    questionAnswered: function (state, index) {
      if (state.questions[i].status)
        state.answeredQuestions.push(state.questions[i])
    },
    correctQuestion: function (state) {
      if ("userInput" === state.question[0].answer)
        state.question[0].status = true;
    }
  },
  actions: {

  }
})