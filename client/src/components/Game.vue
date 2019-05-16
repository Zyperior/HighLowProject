<template>
    <div class="gameContainer">
        <h1 id="head">Game Page</h1>
        <p id="question">{{currentQuestion}}</p>
        <div class="infoContainer">
            <h2 id="highGuess">Highest Guess: {{highGuess[0]}} </h2>
            <h2 id="lowGuess">Lowest Guess: {{lowGuess[0]}} </h2>
            <p id="players" v-for="player in activePlayers" :class="{'activePlayer' : player == activePlayer}">{{player.name}}: <b>{{player.answer}}</b></p>
            <!--<div v-for="bot in activeBots" :class="{'activeBot' : bot == activeBot}">-->
                <!--<p>{{bot.name}}</p>-->
            <!--</div>-->
            <input id="answer" v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer" :disabled="!playerTurn">

                <button id="submitButton" @click="submitAnswer(answer); guess();" :disabled="!playerTurn">Submit Answer</button>
                <audio ref="audioTest" src="/testAudio.wav"></audio>
                <Timer id="timer" ref="myTimer"/>


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
                // this.$refs.audioTest.play();
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
    @media only screen and (min-width: 900px) {
        .gameContainer {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }

        .infoContainer {
            grid-row: 2;
            grid-column: 2;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(4, 1fr)
        }

        #question {
            grid-column: 2;
            grid-row: 1;
            font-weight: bold;
            text-align: center;
        }

        #highGuess {
            grid-row: 1;
            grid-column: 1 / span 2;
        }

        #lowGuess {
            grid-row: 1;
            grid-column: 4 / span 5;
        }

        #players {
            grid-row: 4;
        }

        #timer {
            grid-row: 1;
            grid-column: 3;
        }

        #answer {
            grid-row: 2;
            grid-column: 3;
        }

        #submitButton {
            grid-row: 3;
            grid-column: 3;
        }

        .activePlayer {
            background-color: red;
        }
    }
    @media only screen and (max-width: 899px) {
        .gameContainer {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
        }

        .infoContainer {
            grid-row: 1 ;
            grid-column: 2;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(4, 1fr)
        }
        #head{
            grid-row: 3;
            grid-column: 2;
        }
        #question {
            grid-column: 2;
            grid-row: 1;
            font-weight: bold;
            text-align: center;
        }

        #highGuess {
            grid-row: 2;
            grid-column: 1 / span 2;
        }

        #lowGuess {
            grid-row: 2;
            grid-column: 4 / span 5;
        }

        #players {
            grid-row: 4;
        }

        #timer {
            grid-row: 3;
            grid-column: 1;
            font-weight: bold;
        }

        #answer {
            grid-row: 2;
            grid-column: 3;
        }

        #submitButton {
            grid-row: 3;
            grid-column: 3;
        }

        .activePlayer {
            background-color: red;
        }
    }

</style>