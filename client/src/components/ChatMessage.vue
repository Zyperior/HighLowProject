<template>
    <div class="message-area">
        <transition-group>
            <div v-if="showMessage"
                 v-for="message, index in messages"
                 :message="messages[index]"
                 :key="index"
                 class="message-container">
                <p class="messager-name">{{message.name}}</p>
                <p class="message">{{message.text}}</p>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        name: "ChatMessage",
        data: function () {
            return {
                showMessage: true,
            }
        },
        computed: {
            messages() {
                return this.$store.state.chat.messages;
            }
        },
        methods: {
            hideMessages: function() {
              this.showMessage = false;
            },
            randomTalk: function () {
                //50% chance to return true.
                return (Math.floor(Math.random() * 1) === 0);
            },
            pushMessage: function(msg) {
                switch (this.question.chatType) {
                    case "guessing": {
                        let index = Math.floor(Math.random() * 2);
                        this.message.text = this.player.phrases.guessing[index];
                        break;
                    }
                    case "badGuess": {
                        this.bubble.message = this.player.phrases.badGuess;
                        break;
                    }
                    case "thisCorrect": {
                        this.bubble.message = this.player.phrases.thisBotCorrect;
                        break;
                    }
                    case "thisWin": {
                        this.bubble.message = this.player.phrases.thisBotWinGame;
                        break;
                    }
                    case "otherCorrect": {
                        this.bubble.message = this.player.phrases.otherCorrect;
                        break;
                    }
                    case "otherWin": {
                        this.bubble.message = this.player.phrases.otherWinGame;
                        break;
                    }
                }
            },
            updateBubble: function() {
                // Ta in chatType some argument istället.
                switch (this.question.chatType) {
                    case "guessing": {
                        let index = Math.floor(Math.random() * 2);
                        this.bubble.message = this.player.phrases.guessing[index]; break;
                    }
                    case "badGuess": {
                        this.bubble.message = this.player.phrases.badGuess; break;
                    }
                    case "thisCorrect": {
                        this.bubble.message = this.player.phrases.thisBotCorrect; break;
                    }
                    case "thisWin": {
                        this.bubble.message = this.player.phrases.thisBotWinGame; break;
                    }
                    case "otherCorrect": {
                        this.bubble.message = this.player.phrases.otherCorrect; break;
                    }
                    case "otherWin": {
                        this.bubble.message = this.player.phrases.otherWinGame; break;
                    }
                }
            }
        }
    }

</script>

<style scoped>

.message-area {
    position: absolute;
    left: 25%;
    color: whitesmoke;
    top: 0;
    width: 50%;
    transition: height 0.2s;
}

.message-container {
    background: rgba(0,0,0,.6);
    border-radius: 20px;
}

.messager-name {
    font-weight: 600;
    display: flex;
    margin-left: 5%;
    padding-top: 10px;
}

.message {
    padding: 10px;
}
.v-enter-active {
    animation: expand-bounce 0.3s;
}

.v-leave-active {
    animation: expand-bounce 0.2s reverse;
}

@keyframes expand-bounce {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}
</style>