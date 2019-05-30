import store from '../store'

export default {

    state : {
        messages: [],
    },

    mutations : {
        addMessage: (state, message) => {
            state.messages.push(message);
        },
        removeFirstChatMessage: (state) => {
            state.messages.shift();
        }
    },

    actions : {

        chat(state, answer) {

            let players = store.getters.getPlayers;
            let isBadGuess = store.getters.isBadGuess;
            let activePlayer = store.getters.getActivePlayer;
            let correctAnswer = store.getters.getCorrectAnswer;
            let questions = store.getters.getQuestions;
            let questionCounter = store.getters.getQuestionCounter;

            let speakerIndex = Math.floor(Math.random() * players.length);
            let speaker = players[speakerIndex];

            while(speaker.isHuman){
                speakerIndex = Math.floor(Math.random() * players.length);
                speaker = players[speakerIndex];
            }

            let audio = new Audio('/soundfx/botTest1.wav');

            if (Math.floor(Math.random() * 2) === 0) { // 33% chance to show chat message

                console.log("show message");
                
                if (!store.getters.isMuteSound) {
                    // noinspection JSIgnoredPromiseFromCall
                    audio.play();
                }
                if (isBadGuess && answer !== -1) {

                    store.commit('addMessage', {name: speaker.name, text: speaker.phrases.badGuess, img: speaker.imgSrc});

                } else if (activePlayer.answer === correctAnswer && questionCounter === questions.length) {

                    if(speaker === activePlayer) {

                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.thisBotWinGame, img: speaker.imgSrc});

                    } else {

                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.otherWinGame, img: speaker.imgSrc});
                    }

                } else if (activePlayer.answer === correctAnswer) {

                    if(speaker === activePlayer) {
                    
                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.thisBotCorrect, img: speaker.imgSrc});

                    } else  {

                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.otherCorrect, img: speaker.imgSrc});
                    }

                } else {

                    let nextPlayer;
                    let playerTurn = store.getters.getPlayerTurn;

                    if(playerTurn < players.length) {
                        nextPlayer = players[players.indexOf(activePlayer) + 1];
                    } else if (players.indexOf(activePlayer)+1 === players.length){
                        nextPlayer = players[0];
                    }

                    if (!nextPlayer.isHuman) {
                        let phraseIndex = Math.floor(Math.random() * (nextPlayer.phrases.guessing.length));
                        store.commit('addMessage', {name: nextPlayer.name, text: nextPlayer.phrases.guessing[phraseIndex], img: nextPlayer.imgSrc});
                    }

                }

                store.dispatch('removeChatMessage');   //Removes message after a while (setTimeout).
            }

        },

        removeChatMessage() {
            setTimeout(() => {
                store.commit('removeFirstChatMessage');
            }, 2850); //2.85s to remove messages
        }
    },
    methods : {
        //50% chance to return true.
        randomTalk: function () { return (Math.floor(Math.random() * 2) === 0); },

    }
}
