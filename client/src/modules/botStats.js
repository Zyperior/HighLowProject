import axios from "axios";

export default {
    namespaced: true,
    actions:{

        /**
         * Once this module is imported to the store, call from:
         * component - "this.$store.dispatch('botStats/getAllBotStats');"
         * module - import store - "store.dispatch('botStats/getAllBotStats');"
         * @returns Array of {Bot}
         */
        async getAllBotStats({commit}){
            const response = await axios.get(
                'http://localhost:5000/bots/'
            );
            return response.data[0];
        },

        /**
         * Once this module is imported to the store, call from:
         * component - "this.$store.dispatch('botStats/getBotStats', name);"
         * module - import store - "store.dispatch('botStats/getBotStats', name);"
         * @param name - String - name of bot
         * @returns {Bot}
         */
        async getBotStats({commit}, name){
            const response = await axios.get(
                'http://localhost:5000/bots/' + name
            );
            return response.data[0];
        },

        /**
         * Once this module is imported to the store, call from:
         * module - import store - "store.dispatch('botStats/getBotStats', dataArray);"
         * @param dataArray - [name, points, guessCounter, correctAnswers]
         * @returns {Promise<void>}
         */
        async updateBotStats({commit}, dataArray){

            if(dataArray){

                const response = await axios.put(
                    'http://localhost:5000/stats/',
                    {name: dataArray[0], points : dataArray[1], guessCounter: dataArray[2], correctAnswers: dataArray[3]}
                );

            }
            else{
                console.error("Bad input param dataObject: " + dataArray.toString())
            }
        }
    },

};


