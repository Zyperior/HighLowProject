<template>
    <div>
        <h1>Game Page</h1>
        <div v-show="isGameRunning">
            <p>{{currentQuestion}}</p>
            <div>
                <h2>Highest Guess: {{highGuess[0]}} </h2>
                <h2>Lowest Guess: {{lowGuess[0]}} </h2>
                <!-- <p v-for="player in activePlayers" :class="{'activePlayer' : player == activePlayer}">{{player.name}}: <b>{{player.answer}}</b></p> -->

                <div id="playerCardsDiv">
                    <PlayerCards :active-players="activePlayers" ref="myPlayerCards"></PlayerCards>
                </div>

                <!--<div v-for="bot in activeBots" :class="{'activeBot' : bot == activeBot}">-->
                <!--<p>{{bot.name}}</p>-->
                <!--</div>-->
                <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer" :disabled="!playerTurn" autocomplete="off" v-on:keydown.enter="submitAnswerWithEnter(answer); guess();">
                
                <div>
                    <button @click="submitAnswer(answer); guess();" :disabled="!playerTurn || answer.length === 0" :class="{buttonDisabled: !playerTurn || answer.length === 0}">Submit Answer</button>
                    <button @click="startVoiceRecording" :disabled="!playerTurn" :class="{buttonDisabled: !playerTurn}">Push To Talk</button>
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

    //Some voice recognition.
    var recognition = new webkitSpeechRecognition() || SpeechRecognition();

    export default {
        data(){
          return {
              playerTurn: true,
              number: 0,
              activePlayer: {},
              recording: false
          }
        },
        methods: {
            // startGame() {
            //     console.log("Start game!");
                
            //     this.$refs.myPlayerCards.initIndexes();
            //     this.$store.dispatch("startGame");
                
            // },
            submitAnswer(a) {

                if(this.isGameRunning){
                    if(!this.muteSounds){
                        let answerSound = new Audio('/soundfx/testAudio.wav');
                        answerSound.play();
                    }
                    this.$store.dispatch("submitAnswer", a);
                    let chatPayload = [this.interval, this.activePlayer, this.activePlayers];

                    this.$refs.myPlayerCards.flipCards();
                    
                    if(this.$store.state.game.chattyBots) {
                        this.$store.dispatch("chat", chatPayload);
                    }
                }

            },


            submitAnswerWithEnter(answer) {

                if (answer.length != 0) {

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
                let audio = new Audio();
                if(!this.muteSounds){
                    audio.src = bot.soundFx[0];
                    audio.play();
                }
                let randTime = Math.floor(Math.random() * 5000) + this.animationTime + 200;
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
              return this.$store.getters.getIsGameRunning;
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
                    lowestGuess: this.lowGuess[0],
                    highestGuess: this.highGuess[0],
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
            answer: {
                get() {
                    return this.$store.getters.getAnswer;
                },
                set(answer) {
                    this.$store.dispatch('updateAnswer', answer);
                }
            },
            currentQuestion() {
                return this.$store.getters.getCurrentQuestion;
            },
            startTimer() {
                return this.$store.getters.getStartTimer;
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
                return this.$store.getters.correctAnswer;
            },
            activePlayers(){
                return this.$store.getters.getActivePlayers;
            },
            isTimerZero(){
                return this.$store.getters.getIsTimerZero;
            },

            animationTime() {
                return this.$store.getters.getAnimationTime;
            },

            muteSounds(){
                return this.$store.getters.getMuteSound;
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
                this.submitAnswer(0);
                this.guess();
            }



        },
        components: {
            ChatMessage,
            Timer,
            PlayerCards
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
  opacity: 0.5;
  cursor: not-allowed;
}


</style>