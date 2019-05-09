import axios from "axios"



//Add for example something like this to load ten questions into the vuex store with given settings:
//if difficulty and category is 0 it loads all questions

// methods: {
//     loadQuestionsFromApi(){
//         this.$store.dispatch("getQuestions2", {amount: 10, difficulty: 2, category: 1});
//     }
// }



const state = {
    questions2: []
}


const actions = {
    async getQuestions2({commit}, settings) {

        const response = await axios.get(
            `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
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