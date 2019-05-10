import axios from "axios";

const state = {
    generalStats : {}
}

const actions = {
    async getDBData({commit}){
        const response = await axios.get(
            'http://localhost:5000/stats'
        );
        commit('setGeneralStats', response);
    },

    /**
     * @param dataObject - {questionsAsked : Integer, totalGuesses : Integer}
     * @returns {Promise<void>}
     */
    async postDBData({commit}, dataObject){

        if(dataObject){
            if(dataObject.questionsAsked && dataObject.totalGuesses){
                const response = await axios.post(
                    'http://localhost:5000/stats',
                    {questionsAsked : dataObject.questionsAsked, totalGuesses : dataObject.totalGuesses}
                );
                commit('setGeneralStats', response);
            }
            else{
                console.error("Bad input param dataObject: " + dataObject.toString())
            }
        }
        else{
            console.error("Bad input param dataObject: " + dataObject.toString())
        }
    }
}

const mutations = {
    setGeneralStats(state, data){
        state.generalStats = data;
    }
}
