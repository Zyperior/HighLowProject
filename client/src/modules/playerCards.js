const state =  {

    flipCards: false,

    indexCurrentPlayer: 0,

    indexes: []

};



const mutations = {

    flipCards: state => {        

        state.flipCards = true;
            
            let i = 0;

            let interval = setInterval(function() {

                i++;

                if (i === 1) {

                    state.flipCards = false;     
                    
                    state.indexCurrentPlayer++;

                    // if (state.indexCurrentPlayer === arrayLength - 1) {

                    //     state.indexCurrentPlayer = 0;

                    // }

                    // else {

                    //     state.indexCurrentPlayer++;

                    // }

                    console.log(state.indexCurrentPlayer);
                    

                    clearInterval(interval);

                }

            }, 1500);

    },

    initIndexes: state => {

        console.log("Init indexes!");
        

        state.indexes = [];

        for (let index = 0; index < arrayLength; index++) {

            state.indexes.push(index);
            
        }

    }


};


const getters = {

    flipCardsOngoing: state => {

        return state.flipCards;

    },


    playerIndexes: state => {

        return state.playerIndexes;        

    }

};






export default{
    state,
    getters,
    mutations
}