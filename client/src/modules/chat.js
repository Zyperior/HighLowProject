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
        },
    },

    actions : {
        chat(state, answer) {
            /*
            1. Bad guess chat
            2. Correct chat.
                2.1. Win chat?
                2.2. Correct guess.
            3. "My turn"-chat.
             */

            let players = store.getters.getPlayers;
            let isBadGuess = store.getters.isBadGuess;
            let activePlayer = store.getters.getActivePlayer;
            let correctAnswer = store.getters.getCorrectAnswer;
            let questions = store.getters.getQuestions;
            let questionCounter = store.getters.getQuestionCounter;
            let lastGuess = store.getters.getLastGuess;
            let speakerIndex = Math.floor(Math.random() * players.length);
            let speaker = players[speakerIndex];

            while(speaker.isHuman){
                speakerIndex = Math.floor(Math.random() * players.length);
                speaker = players[speakerIndex];
            }

            let audio = new Audio('/soundfx/botTest1.wav');

            if (Math.floor(Math.random() * 2) === 0) {
                // One in three chance to show chat message

                if (!store.getters.isMuteSound) {
                    audio.play();
                }

                if (isBadGuess && answer !== -1) {
                    //Guess outside "more than" and "less than".
                    store.commit('addMessage', {name: speaker.name, text: speaker.phrases.badGuess, img: speaker.imgSrc});
                } else if (answer === correctAnswer && questionCounter === questions.length) {
                    //Correct guess on final question.
                    if(speaker === activePlayer) {
                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.thisBotWinGame, img: speaker.imgSrc});
                    } else {
                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.otherWinGame, img: speaker.imgSrc});
                    }
                } else if (lastGuess === correctAnswer) {
                    //Correct guess.
                    let speakerIndex = Math.floor(Math.random() * players.length);
                    let speaker = players[speakerIndex];
                    while(speaker.isHuman){
                        speakerIndex = Math.floor(Math.random() * players.length);
                        speaker = players[speakerIndex];
                    }
                    if(speaker === activePlayer) {
                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.thisBotCorrect, img: speaker.imgSrc});
                    } else  {
                        store.commit('addMessage', {name: speaker.name, text: speaker.phrases.otherCorrect, img: speaker.imgSrc});
                    }
                } else {
                    //"My turn"-chat.
                    let nextPlayer;
                    let playerTurn = store.getters.getPlayerTurn;
                    if(playerTurn !== players.length -1) {
                        nextPlayer = players[playerTurn+1];
                    } else {
                        nextPlayer = players[0];
                    }
                    if (!nextPlayer.isHuman) {
                        let phraseIndex = Math.floor(Math.random() * (nextPlayer.phrases.guessing.length));
                        //Picks from one of the phrases.guessing[].
                        store.commit('addMessage', {name: nextPlayer.name, text: nextPlayer.phrases.guessing[phraseIndex], img: nextPlayer.imgSrc});
                    }
                }
                store.dispatch('removeChatMessage');   //Removes message after a short delay (setTimeout).
            }
        },
        removeChatMessage() {
            setTimeout(() => {
                store.commit('removeFirstChatMessage');
            }, 2850); //2.85s to remove messages
        }
    }
}