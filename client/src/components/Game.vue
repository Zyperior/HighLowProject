<template>
    <div>
        <div v-show="isGameRunning">
            <QuestionCard/>
            <div>
                <div class="aboveBelow">
                    <div>Closest above:</div><div>{{highGuess}}</div>
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
                    <button @click="startVoiceRecording"
                            :disabled="!playerTurn"
                            :class="{buttonDisabled: !playerTurn}">Push To Talk
                    </button>
                </div>
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
    import QuestionCard from './QuestionCard';

    //Some voice recognition.
    //var recognition = new webkitSpeechRecognition() || SpeechRecognition();

    export default {
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
              answer: ''
          }
        },
        methods: {

            submitAnswer(a) {

                if(this.isGameRunning){
                    if(!this.muteSounds){
                        let answerSound = new Audio('/soundfx/testAudio.wav');
                        answerSound.play();
                    }
                    this.$store.dispatch("submitAnswer", a);
                    let chatPayload = [this.interval, this.activePlayer, this.activePlayers];

                    if(this.$store.state.game.chattyBots) {
                        this.$store.dispatch("chat", chatPayload);
                    }
                }

                this.answer = "";

            },


            submitAnswerWithEnter(answer) {

                if (answer.length !== 0) {

                    this.submitAnswer(answer);
                }

            },


            startVoiceRecording() {
                if(this.playerTurn) {
                    if(!this.recording) {
                        this.recording = !this.recording;
                        let that = this;
                        let voiceResult = 0;
                        recognition.lang = this.$store.state.game.speechToTextLanguage;
                        recognition.start();
                        recognition.onresult = function (event) {
                            for (var i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                    voiceResult = event.results[i][0].transcript;
                                    if(this.playerTurn) {
                                        that.$store.commit('submitAnswer', voiceResult);
                                        that.guess();
                                    }
                                }
                            }
                        }
                        this.recording = false;
                    }
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
                let randTime = Math.floor(Math.random() * 5000);
                if(this.isGameRunning){
                    this.botLoopTimeoutFunction = setTimeout(function () {

                        let guess = bot.guess(int);
                        submitGuessFunction(guess);
                        loopFunction();

                    }, randTime)
                }
            },

            guess(){

                if (this.playerTurn) {
                    this.playerTurn = false;
                }

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
            activeBots(){
                return this.$store.getters.playingBots;
            },
            interval(){
                let interval = {
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
                if (typeof interval.lowestGuess === 'undefined')
                    interval.lowestGuess = 0;
                if (typeof interval.highestGuess === 'undefined')
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


</style>
