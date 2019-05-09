<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div v-if="isRunning">
            <p>Highest Guess: {{highGuess[0]}} </p>
            <p>Lowest Guess: {{lowGuess[0]}} </p>
            <input v-model="answer" name="answer" placeholder="Enter your answer">
            <button @click="submitAnswer()">Submit Answer</button>
        </div>
        <button v-if="startStage" @click="startGame()">Start Game</button>
    </div>
</template>
<script>
    export default {
        methods: {
            startGame() {
            this.$store.commit('startGame');
            },
            submitAnswer() {
            this.$store.commit('submitAnswer');
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
            }
        }
    }
</script>
<style scoped>
</style>