<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div>
            <h2>Highest Guess: {{highGuess[0]}} </h2>
            <h2>Lowest Guess: {{lowGuess[0]}} </h2>
            <p v-for="player in activePlayers" :class="{'activePlayer' : player == activePlayer}">{{player.name}}: <b>{{player.answer}}</b></p>
            <!--<div v-for="bot in activeBots" :class="{'activeBot' : bot == activeBot}">-->
                <!--<p>{{bot.name}}</p>-->
            <!--</div>-->
            <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer" :disabled="!playerTurn">
            <button @click="submitAnswer(answer); guess();" :disabled="!playerTurn">Submit Answer</button>
            <Timer ref="myTimer"/>
        </div>

    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'

    export default {
        data(){
          return {
              playerTurn: true,
              number: 0,
              activePlayer: {}
          }
        },
        methods: {
            startGame() {
                this.$store.dispatch("startGame");
            },
            submitAnswer(a) {
                if(!this.muteSounds){
                    let answerSound = new Audio('/soundfx/testAudio.wav');
                    answerSound.play();
                }
                this.$store.dispatch("submitAnswer", a);
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

                setTimeout(function () {
                    let guess = bot.guess(int)
                    submitGuessFunction(guess)
                    loopFunction();
                }, 2000)

            },
            guess(){
                this.activePlayer = this.activePlayers[this.playerCounter]

                if(this.activePlayer.isHuman){
                    this.playerTurn = true;
                }else{
                    this.playerTurn = false;
                    this.botGuess(this.activePlayer);
                }
            }
        },
        computed: {
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
                    lastGuess: this.lastGuess
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
            isStartButtonClicked() {
                return this.$store.getters.getIsStartButtonClicked;
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
            jumpToNextPlayer() {
                return this.$store.getters.getTimeIsUp;
            },
            activePlayers(){
                return this.$store.getters.getActivePlayers;
            },
            isTimerZero(){
                return this.$store.getters.getIsTimerZero;
            },
            muteSounds(){
                return this.$store.getters.getMuteSound;
            }
        },
        watch: {
            isStartButtonClicked(){
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
            Timer
        }      


    }
</script>
<style scoped>

.activePlayer {
    background-color: red;
}


</style>