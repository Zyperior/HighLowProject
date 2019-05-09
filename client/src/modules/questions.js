import axios from "axios"

const state = {
    questions: [{question: "this is a test question"}]
}


const actions = {
    async getQuestions({commit}) {
        const response = await axios.get(
            'http://localhost:5000/questions'
        );
        console.log(response)
        commit('setQuestions', response.data);
    }
}


const mutations = {
    setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions)
}


export default {
    state,
    actions,
    mutations
}