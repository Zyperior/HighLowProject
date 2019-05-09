import axios from "axios"

const state = {
    questions2: [{question: "this is a test question"}]
}


const actions = {
    async getQuestions2({commit}) {
        const response = await axios.get(
            'http://localhost:5000/questions'
        );
        console.log(response)
        commit('setQuestions', response.data);
    }
}


const mutations = {
    setQuestions: (state, loadedQuestions) => (state.questions2 = loadedQuestions)
}


export default {
    state,
    actions,
    mutations
}