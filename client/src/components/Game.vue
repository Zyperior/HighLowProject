<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div v-show="isRunning">
            <p>Highest Guess: {{highGuess[0]}} </p>
            <p>Lowest Guess: {{lowGuess[0]}} </p>
            <p>{{players[0].name}}: {{players[0].answer}}</p>
            <p>{{players[1].name}}: {{players[1].answer}}</p>
            <input type="text" v-model="answer" name="answer" placeholder="Enter your answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')">
            <button @click="submitAnswer()">Submit Answer</button>

            <Timer ref="myTimer"/>
        </div>
        <button v-show="startStage" @click="startGame()">Start Game</button>
    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'

    export default {
        methods: {
            startGame() {               
                //this.$store.commit('startGame');
                //this.$refs.myTimer.startTimer();
                this.$store.dispatch("startGame");      // Anropar action istället för mutation
            },
            submitAnswer() {
                //this.$store.commit('submitAnswer');
                this.$store.dispatch("submitAnswer");      // Anropar action istället för mutation
            }
        },
        computed: {
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
                return this.$store.getters.getPlayers;
            }
        },

        components: {
            Timer
        }      


    }
</script>
<style scoped>
</style>