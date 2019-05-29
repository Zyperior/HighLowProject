 import store from '../store'

const state =  {
    messages: [],
    audio: new Audio()
};

const actions = {
    chat(state, object) {
        let interval = object[0];
        let activePlayer = object[1];
        let players = object[2];
        let phraseArray = [];
        /*
        1. isBadGuess?
        2. Rätt svar?
            2.1. Sista rundan?
            2.2. Vem gissade?
        3. Guessing.
         */
        if(Math.floor(Math.random() * 2) == 0) {
            if (interval.isBadGuess() && interval.answer !== -1) {
                methods.badGuessChat(players)
            } else if (activePlayer.answer == interval.correctAnswer && state.game.questionCounter === state.game.questions.length) {
                methods.winChat(players, activePlayer);
            } else if (activePlayer.answer == interval.correctAnswer) {
                methods.correctChat(players, activePlayer);
            } else {
                methods.guessingChat(players, activePlayer);
            }
            store.dispatch('removeChatMessage');   //Removes message after a while (setTimeout).
        } else {
        }

    },
    removeChatMessage(state) {
        setTimeout(() => {
            store.commit('removeFirstChatMessage');
        }, 2850); //2.85s to remove messages
    }
};

const mutations = {
    addMessage: (state, message) =>  {
        state.messages.push(message);
    },
    removeFirstChatMessage: (state) => {
        state.messages.shift();
    }
};

const data = {
    function() {
        return {
            showMessage: false,
        }
    }
};

const methods = {
    randomTalk: function () {
        //50% chance to return true.
        return (Math.floor(Math.random() * 2) === 0);
    },
    badGuessChat: function(players) {
        //Random player badGuess. If human, recursive.
        let speakerIndex = Math.floor(Math.random() * players.length);
        let speaker = players[speakerIndex];
        if (!speaker.isHuman) {
            if (!store.getters.isMuteSound) {
                state.audio.src = speaker.soundFx.badGuessSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: speaker.name, text: speaker.phrases.badGuess})
        } else if(speaker.isHuman) {
            this.badGuessChat(players);
        }
    },
    guessingChat: function(players, activePlayer) {
        //"I'm guessing"-chat. Want the NEXT turn's player to say that, not at the guess. If human, recursive.
        let nextPlayer;
        if(players.indexOf(activePlayer)+1 < players.length) {
            nextPlayer = players[players.indexOf(activePlayer) + 1];
        } else if (players.indexOf(activePlayer)+1 == players.length){
            nextPlayer = players[0];
        }
        if (!nextPlayer.isHuman) {
            let phraseIndex = Math.floor(Math.random() * (nextPlayer.phrases.guessing.length));
            if (!store.getters.isMuteSound) {
                state.audio.src = nextPlayer.soundFx.guessingSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: nextPlayer.name, text: nextPlayer.phrases.guessing[phraseIndex]});
        }
    },
    winChat: function (players, activePlayer) {
        //Random winGame. If human, recursive.
        let randomSpeaker = players[Math.floor(Math.random() * players.length)];
        if(randomSpeaker == activePlayer && !randomSpeaker.isHuman) {
            if (!store.getters.isMuteSound) {
                state.audio.src = randomSpeaker.soundFx.thisBotWinGameSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: randomSpeaker.name, text: randomSpeaker.phrases.thisBotWinGame});
        } else if(!randomSpeaker.isHuman) {
            if (!store.getters.isMuteSound) {
                state.audio.src = randomSpeaker.soundFx.otherWinGameSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: randomSpeaker.name, text: randomSpeaker.phrases.otherWinGame});
        } else {
            this.winChat(players, activePlayer);
        }
    },
    correctChat: function(players, activePlayer) {
        //Random correct guess. If human, recursive.
        let randomSpeaker = players[Math.floor(Math.random() * players.length)];
        if(randomSpeaker == activePlayer && !randomSpeaker.isHuman) {
            if (!store.getters.isMuteSound) {
                state.audio.src = randomSpeaker.soundFx.thisBotCorrectSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: randomSpeaker.name, text: randomSpeaker.phrases.thisBotCorrect});
        } else if(!randomSpeaker.isHuman) {
            if (!store.getters.isMuteSound) {
                state.audio.src = randomSpeaker.soundFx.otherCorrectSfx;
                state.audio.play();
            }
            store.commit('addMessage', {name: randomSpeaker.name, text: randomSpeaker.phrases.otherCorrect});
        } else {
            this.correctChat(players, activePlayer);
        }
    },
};

export default {
    state,
    actions,
    mutations
}
