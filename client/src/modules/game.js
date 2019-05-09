import axios from "axios";

const state = {
    questions: [],

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
    }
}

const actions = {
    async getQuestions({commit}, settings) {

        const response = await axios.get(
            `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
        );
        commit('setQuestions', response.data);
        commit("startGame");
    },

    updateAnswer: ({commit}, a) => {
        commit('updateAnswer', a);
    }
}

const mutations = {
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
    },
    setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions)
}



export default {
    state,
    getters,
    mutations,
    actions
}
