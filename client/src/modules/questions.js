import axios from "axios"



//Add for example something like this to load ten questions into the vuex store with given settings:
//if difficulty and category is 0 it loads all questions

// methods: {
//     loadQuestionsFromApi(){
//         this.$store.dispatch("getQuestions2", {amount: 10, difficulty: 2, category: 1});
//     }
// }



// const state = {
//     questions: []
// }
//
//
// const actions = {
//     async getQuestions({commit}, settings) {
//
//         const response = await axios.get(
//             `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
//         );
//         commit('setQuestions', response.data);
//         console.log(state.questions)
//         commit("startGame")
//     }
// }
//
//
// const mutations = {
//     setQuestions: (state, loadedQuestions) => (state.questions = loadedQuestions)
// }
//
//
// export default {
//     state,
//     actions,
//     mutations
// }