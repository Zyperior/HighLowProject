<template>
    <div>
        <h1>Game Page</h1>
        <div v-show="isGameRunning">
            <p>{{currentQuestion}}</p>
            <div>
                <h2>Highest Guess: {{highGuess[0]}} </h2>
                <h2>Lowest Guess: {{lowGuess[0]}} </h2>
                <p v-for="player in activePlayers" :class="{'activePlayer' : player == activePlayer}">{{player.name}}: <b>{{player.answer}}</b></p>
                <!--<div v-for="bot in activeBots" :class="{'activeBot' : bot == activeBot}">-->
                <!--<p>{{bot.name}}</p>-->
                <!--</div>-->
                <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer" :disabled="!playerTurn">
                <div>
                    <button @click="submitAnswer(answer); guess();" :disabled="!playerTurn">Submit Answer</button>
                    <audio ref="audioTest" src="/testAudio.wav"></audio>
                    <button @click="startVoiceRecording">Push To Talk</button>
                </div>
                <chat-message/>
                <Timer ref="myTimer"/>
            </div>
        </div>


    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'
    import ChatMessage from "./ChatMessage";

    //Some voice recognition.
    var recognition = new webkitSpeechRecognition() || SpeechRecognition();
    recognition.lang ="sv-SE";

    export default {
        data(){
          return {
              playerTurn: true,
              number: 0,
              activePlayer: {},
          }
        },
        methods: {
            startGame() {
                this.$store.dispatch("startGame");
            },
            submitAnswer(a) {

                if(this.isGameRunning){
                    this.$refs.audioTest.play();
                    this.$store.dispatch("submitAnswer", a);
                    let chatPayload = [this.interval, this.activePlayer, this.activePlayers];
                    this.$store.dispatch("chat", chatPayload);
                }



            },
            startVoiceRecording() {
                if(this.playerTurn) {
                    var that = this;
                    let voiceResult = "";
                    recognition.start();
                    recognition.onresult = function(event) {
                        for (var i = event.resultIndex; i < event.results.length; i++) {
                            if(event.results[i].isFinal) {
                                voiceResult = event.results[i][0].transcript;
                                console.log(voiceResult);
                                that.$store.commit('submitAnswer', voiceResult);
                                that.guess();
                            }
                        }
                    }
                } else {
                    console.log('Not player turn')
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

                        let guess = bot.guess(int)
                        submitGuessFunction(guess)
                        loopFunction();

                    }, randTime)
                }
            },

            guess(){
                this.activePlayer = this.activePlayers[this.playerCounter]

                if(this.activePlayer.isHuman){
                    this.playerTurn = true;
                }else {
                    this.playerTurn = false;
                    this.botGuess(this.activePlayer);
                }
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
            Timer
        }      


    }
</script>
<style scoped>

.activePlayer {
    background-color: red;
}


</style>