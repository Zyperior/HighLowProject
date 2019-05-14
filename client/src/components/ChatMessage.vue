<template>
    <div class="message-area">
        <transition-group>
            <div v-if="showMessage"
                 v-for="message, index in messages"
                 :message="messages[index]"
                 :key="index"
                 class="message-container"
                 >
                <p class="messager-name">{{message.name}}</p>
                <p class="message">{{message.text}}</p>
            </div>
        </transition-group>
    </div>
</template>

<script>
    //<div v-show="showBubble" id="SpeechBubble">{{bubble.message}}</div>
    const Card = {
        props: ['player', 'message'],

    };

    export default {
        name: "ChatMessage",
        data: function () {
            return {
                player: {
                    name: "Testname",
                    points: 8,
                    correctGuesses: 2,
                    phrases: {
                        guessing: ["guessing1", "guessing2"],
                        badGuess: "badGuess",
                        thisBotCorrect: "thisCorrect",
                        thisBotWinGame: "thisWinGame",
                        otherCorrect: "otherCorrect",
                        otherWinGame: "otherWin"
                    }
                },
                showBubble: false,
                showMessage: true,
                bubble: {
                    message: "Bubble message here"
                },
                question: {
                    chatType: "otherWin"
                },
                messages: [{name: "Bo", text:"hello"}, {name: "Segelbot", text:"goodbye"}, {name: "The La Bossen", text:"cheesecake"}, {name: "Abbott", text:"ipsum lorem dolor set this is a long message and I couldn't remember more on ipsum lorem and for whatever reason intellij didn't want to do the ipsum20+tab that worked before. I tried lorem20, too, but that didn't work either."}]
            }
        },
        methods: {
            hideMessage: function() {
              this.showMessage = false;
            },
            toggleBubble: function () {
                if(this.randomTalk()) {
                    this.updateBubble();
                    this.showBubble = true;
                    setTimeout(() => {
                        this.showBubble = false;
                    }, 2000);
                }
            },
            randomTalk: function () {
                //50% chance to return true.
                return (Math.floor(Math.random() * 1) === 0);
            },
            pushMessage: function(msg) {
                if(this.messages.length !== 3) {

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
        },
    }

</script>

<style scoped>

.card {
    /* Add shadows to create the "card" effect */
    transition: 0.3s;
    position: relative;

    /* Can move out of scoped style */
    margin: 90px auto;
    width: 50%;
    height: 150px;
    border-radius: 5px;
}

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


/* #SpeechBubble is set as a child of #Rectangle to make positioning
it easier. #SpeechBubble is given an absolute position so that its
position is relative to the #Rectangle (its parent). Its scale is
set to zero since it should only appear when the mouse hovers over
#Rectangle. The 'animation-fill-mode' property is set to 'forwards'
so that  the scale value stays at 1 after the animation finishes,
otherwise  #SpeechBubble will disappear once the animation finishes.
The 'animation-name' property is omitted since it's going to be
set by jQuery instead */
#SpeechBubble {
    position: absolute;
    transform-origin: 0 100%;
    text-align: center;
    background-color: #5a5a5a;
    color: white;
    border-radius: 10px;
    width: 120px;
    padding: 10px;
    left: 102%;
    top: -2em;
    transform: scale(1);
    animation-fill-mode: forwards;
}
/* We need to add a tail to the speech bubble. This is done using
the ::before pseudo-element. The tail's size is controlled by
its borders. The right and bottom borders are given a transparent
color so that the tail still retains its shape while giving the
desired look */
#SpeechBubble::before {
    content: "";
    display: block;
    width: 0;
    position: absolute;
    bottom: -25px;
    left: 5px;
    border-style: solid;
    border-width: 15px;
    border-color: #5a5a5a transparent transparent #5a5a5a;
    transform: rotate(10deg);
}

/* Here the scale changes from 0 to 1. To add the bounciness
effect, the scale is set to 1.25 midway through the animation
to give the animation a nicer effect. */

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

/* Here the scale simply goes from 1 back to 0 */
@keyframes shrink {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}

</style>