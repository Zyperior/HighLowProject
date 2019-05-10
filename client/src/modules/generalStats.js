import axios from "axios";

export default {

    state:{
        generalStats: {}
    },

    actions:{

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
        async postDBData({commit}, dataArray){

            if(dataObject){

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
    },

    mutations:{
        setGeneralStats(state, data){
            state.generalStats = data;
        }
    }

};


