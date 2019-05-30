<template>
    <div>
        <div v-show="isGameRunning">
            <QuestionCard/>
            <div>
                <div class="aboveBelow">
                    <div>Closest above:</div><div class="highGuess">{{highGuess}}</div>
                    <div>Closest below:</div><div>{{lowGuess}}</div>
                </div>

                <div id="playerCardsDiv">
                    <PlayerCards :active-players="activePlayers" ref="myPlayerCards"></PlayerCards>
                </div>

                <input v-model="answer"
                       oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')"
                       name="answer"
                       placeholder="Enter your answer"
                       :disabled="!playerTurn"
                       autocomplete="off"
                       v-on:keydown.enter="submitAnswerWithEnter(answer); guess();"
                />

                <div>
                    <button @click="submitAnswer(answer); guess();"
                            :disabled="!playerTurn || answer.length === 0"
                            :class="{buttonDisabled: !playerTurn || answer.length === 0}">Submit Answer
                    </button>
                    <button v-if="speechRecognitionAvailable"
                            @click="startVoiceRecording"
                            :disabled="!playerTurn"
                            :class="{buttonDisabled: !playerTurn}">Click To Talk
                    </button>
                </div>
                <div class="high-or-low" v-if="showHiOrLow">{{hilo}}</div>
                <chat-message/>
                <Timer ref="myTimer"/>
            </div>
        </div>
    </div>

</template>
<script>
    import Timer from '@/components/Timer.vue';
    import ChatMessage from "./ChatMessage";
    import PlayerCards from '@/components/PlayerCards.vue';
    import {getCurrentSettings} from '@/modules/settingsData';
    import QuestionCard from './QuestionCard';

    //Some voice recognition.
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();
    }

    export default {
        name: 'Game',
        components: {
            ChatMessage,
            Timer,
            PlayerCards,
            QuestionCard
        },
        data(){
            return {
                playerTurn: true,
                number: 0,
                activePlayer: {},
                recording: false,
                answer: '',
                speechRecognitionAvailable: window.hasOwnProperty('webkitSpeechRecognition'),
                showHiLo: false,
            }
        },
        methods: {

            submitAnswer(a) {

                if(this.isGameRunning){
                    if(!this.muteSounds){
                        let answerSound = new Audio('/soundfx/testAudio.wav');
                        answerSound.play();
                    }

                    this.showFeedback();
                    this.$store.dispatch("submitAnswer", a);

                    let chatPayload = [this.interval, this.activePlayer, this.activePlayers];
                    if(this.$store.state.game.chattyBots) {
                        this.$store.dispatch("chat", chatPayload);
                    }
                }

                this.answer = "";

            },
            showFeedback() {
              //Timeout for "Higher!" "Lower!" messages.
              this.showHiLo = true;
                setTimeout(() => {
                    this.showHiLo = false;
                }, 1500);
            },


            submitAnswerWithEnter(answer) {

                if (answer.length !== 0) {

                    this.submitAnswer(answer);
                }

            },


            startVoiceRecording() {
                //Starts recording if player turn and not currently recording, when recording stops submit if it's still the player turn.
                if (this.playerTurn) {
                    let that = this;
                    let voiceResult = 0;
                    recognition.lang = getCurrentSettings().micInputLanguage;
                    if(!this.recording) {
                        recognition.start();
                        this.recording = true;
                        recognition.onresult = function (event) {
                            for (let i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                    voiceResult = event.results[i][0].transcript;
                                    if (that.playerTurn) {
                                        that.submitAnswer(voiceResult);
                                        that.guess();
                                    }
                                }
                            }
                        };
                    }
                    recognition.onend = function() {
                        this.recording = false;
                    };
                }
            },
            add(){
              this.number++;
            },
            reset(){
                this.number = 0;
                this.playerTurn = true;
            },
            botGuess(bot){
                let submitGuessFunction = this.submitAnswer;
                let int = this.interval;
                let loopFunction = this.guess;
                let randTime = (Math.ceil(Math.random() * 5)) * 1000; //Milliseconds

                if(this.isGameRunning){
                    this.botLoopTimeoutFunction = setTimeout(function () {

                        let guess = bot.guess(int);  //Returns a guess based on the interval-object
                        submitGuessFunction(guess);  //Submit the guess to the game
                        loopFunction();             //Go back to original guess-method to get to next guesser

                    }, randTime)  //Bot takes between 1-5 seconds to guess
                }
            },

            guess(){

                let thisComponent = this;

                setTimeout(function() {

                    thisComponent.activePlayer = thisComponent.activePlayers[thisComponent.playerCounter];

                    if(thisComponent.activePlayer.isHuman){
                        thisComponent.playerTurn = true;

                    }else {
                        thisComponent.playerTurn = false;
                        thisComponent.botGuess(thisComponent.activePlayer);
                    }

                }, thisComponent.animationTime);

            }

        },
        computed: {
            isGameRunning(){
              return this.$store.getters.isGameRunning;
            },
            hilo(interval) {
                if (interval.lastGuess === -1) {
                    return "Too slow!"
                } else if (interval.lastGuess === interval.correctAnswer) {
                    return "Correct!"
                } else if (interval.lastGuess > interval.correctAnswer) {
                    return "Lower!"
                } else if (interval.lastGuess < interval.correctAnswer) {
                    return "Higher!"
                }
            },

            botLoopTimeoutFunction: {
                get(){
                    return this.$store.getters.getBotLoopTimeoutFunction;
                },
                set(timeoutFunction){
                    this.$store.commit("setBotTimeoutFunction", timeoutFunction)
                }

            },
            playerCounter(){
              return this.$store.getters.getPlayerTurn;
            },
            showHiOrLow() {
                return this.showHiLo;
            },
            activeBots(){
                return this.$store.getters.playingBots;
            },
            interval(){
                let interval = {           //This object is for the bots to use with information about current answer/round
                    lowestGuess: this.lowGuess,
                    highestGuess: this.highGuess,
                    correctAnswer: this.correctAnswer,
                    isInInterval: function () {
                        return (this.lowestGuess < this.correctAnswer && this.highestGuess > this.correctAnswer);
                    },
                    lastGuess: this.lastGuess,
                    isBadGuess: function() {
                        return (this.lastGuess < this.lowestGuess || this.lastGuess > this.highestGuess)
                    },
                    isCorrect: function() {
                        return (this.lastGuess === this.correctAnswer);
                    }
                }
                if (interval.lowestGuess === '')
                    interval.lowestGuess = 0;
                if (interval.highestGuess === '')
                    interval.highestGuess = 0;

                return interval;
            },
            lastGuess() {
              return this.$store.getters.getLastGuess;
            },
            startTimer() {
                return this.$store.getters.isStartTimer;
            },
            lowGuess() {
                return this.$store.getters.getLowGuess;
            },
            highGuess() {
                return this.$store.getters.getHighGuess;
            },
            players(){
                return this.$store.getters.getPlayers;
            },
            correctAnswer(){
                return this.$store.getters.getCorrectAnswer;
            },
            activePlayers(){
                return this.$store.getters.getPlayers;
            },
            isTimerZero(){
                return this.$store.getters.getIsTimerZero;
            },

            animationTime() {
                return this.$store.getters.getAnimationTime;
            },

            muteSounds(){
                return this.$store.getters.isMuteSound;
            }

        },
        watch: {
            startTimer(){
                this.$refs.myTimer.stopTimer();
                this.$refs.myTimer.startTimer();
                this.activePlayer = this.players[this.playerCounter]
                this.guess();
            },
            isTimerZero(){
                this.submitAnswer(-1);
                this.guess();
            }
        }
    }
</script>
<style scoped>

    * {
        box-sizing: border-box;
    }

    .activePlayer {
        background-color: red;
    }

    #playerCardsDiv {
        width: 21vw;
        height: 32vw;
        margin: auto;
        text-align: center;
        /* border: 1px solid black; */
    }


    .buttonDisabled{
      opacity: 0.6;
      cursor: not-allowed;
    }

    .aboveBelow{
        display: grid;
        grid-template-columns: 31% 19% 31% 19%;
        font-size: 15px;
        text-align: start;
    }

.high-or-low{
    position: absolute;
    left: 25%;
    top: 43%;
    font-weight: 800;
    font-size: 20px;
}

</style>
