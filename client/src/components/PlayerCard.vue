<template>
    <div class="card">
        <div class="container" @mouseenter="toggleBubble">
            <h4><b>{{player.name}}</b></h4>
            <p>Points: {{player.points}}</p>
            <p>Correct guesses: {{player.correctGuesses}}</p>
            <transition>
                <div v-show="showBubble" id="SpeechBubble">{{bubble.message}}</div>
            </transition>
        </div>
    </div>
</template>

<script>
    const Card = {
        props: ['player'],

    };

    export default {
        name: "PlayerCard",
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
                bubble: {
                    message: "Bubble message here"
                },
                question: {
                    chatType: "otherWin"
                }
            }
        },
        methods: {
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
                return (Math.floor(Math.random() * 2) === 1);
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
    box-shadow: 2px 8px 16px 2px rgba(0,0,0,0.2);
    transition: 0.3s;
    position: relative;

    /* Can move out of scoped style */
    margin: 90px auto;
    width: 50%;
    height: 150px;
    border-radius: 5px;
}

.container {
    padding: 2px 16px;
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