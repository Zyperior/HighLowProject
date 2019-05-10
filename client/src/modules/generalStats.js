import axios from "axios";

export default {
    namespaced: true,
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
         * @param dataArray - [0] = questions asked, [1] = total guesses
         * @returns {Promise<void>}
         */
        async postDBData({commit}, dataArray){

            if(dataArray){

                const response = await axios.put(
                    'http://localhost:5000/stats',
                    {questionsAsked : dataArray[0], totalGuesses : dataArray[1]}
                );
                commit('setGeneralStats', response);

            }
            else{
                console.error("Bad input param dataObject: " + dataArray.toString())
            }
        }
    },

    mutations:{
        setGeneralStats(state, data){
            state.generalStats = data;
        }
    }

};


