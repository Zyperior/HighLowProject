const state = {
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
    players: [{
        name: "Player One"
    },
    {
        name: "Player Two"
    }],
    currentQuestion: "",
    startStage: true,
    isRunning: false,
    answerAttempts: 0,
    answer: "",
    questionCounter: 0,

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
            state.questionCounter += 1;
            state.lowAnswers = [];
            state.highAnswers = [];

            if (state.questionCounter === state.questions.length) {
                state.questionCounter = 0;
            }
            state.currentQuestion = state.questions[state.questionCounter].question;
        }
        if (state.answer < state.questions[state.questionCounter].answer) {
            console.log('Your answer is to low');
            state.lowAnswers.push(state.answer);
            state.lowAnswers.reverse();
            console.log(state.lowAnswers);
        }
        if (state.answer > state.questions[state.questionCounter].answer) {
            console.log('Your answer is to high');
            
            state.highAnswers.push(state.answer);
            state.highAnswers.sort();
            console.log(state.highAnswers);

        }

        state.answer = '';
    },
    updateAnswer: (state, a) => {
        state.answer = a;
    }
}

const actions = {
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