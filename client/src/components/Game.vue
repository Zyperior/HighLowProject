<template>
    <div v-show="isRunning">
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div>
            <p>Highest Guess: {{highGuess[0]}} </p>
            <p>Lowest Guess: {{lowGuess[0]}} </p>
            <p>{{players[0].name}}: {{players[0].answer}}</p>
            <p>{{players[1].name}}: {{players[1].answer}}</p>
            <br>
            <p>{{activeBot.name}}</p>
            <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer" :disabled="!playerTurn">
            <div>
                <button @click="submitAnswer(answer); botGuess();">Submit Answer</button>
                <audio ref="audioTest" src="/testAudio.wav"></audio>
                <audio ref="answerCorrect" src="/correctAnswer.wav"></audio>
            </div>
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
              activeBot: {}
          }
        },
        methods: {
            add(){
              this.number++;
            },
            reset(){
                this.number = 0;
                this.playerTurn = true;
            },
            submitAnswer(a) {
                this.$refs.audioTest.play();
                this.$store.commit('submitAnswer', a);
            },
            botGuess(){
                console.log("inside bot guess")
                this.playerTurn = false;
                let bots = this.activeBots;
                let bot = bots[this.number];
                let submitGuessFunction = this.submitAnswer;
                let int = this.interval;
                let nr = this.number;
                let addFunction = this.add;
                let resetFunction = this.reset;
                let loopFunction = this.botGuess;
                this.activeBot = bot;
                console.log(bots);
                setTimeout(function () {
                    let guess = bot.guess(int)
                    console.log(bot.name + " "+guess)
                    submitGuessFunction(guess)
                    addFunction()
                    if (nr < bots.length - 1) {
                        loopFunction();
                    }
                    else {
                        resetFunction();
                    }
                }, 2000)

            }
        },
        computed: {
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
            isRunning() {
                return this.$store.getters.getIsRunning;
            },
            startStage() {
                return this.$store.getters.getStartStage;
            },
            lowGuess() {
                return this.$store.getters.getLowGuess;
            },
            highGuess() {
                return this.$store.getters.getHighGuess;
            },
            players(){
                return this.$store.getters.getPlayers
            },
            correctAnswer(){
                return this.$store.getters.correctAnswer;
            }
        },
        watch: {
            startStage(){
                this.$refs.myTimer.startTimer();
            }
        },
        components: {
            Timer
        }
    }
</script>
<style scoped>




</style>