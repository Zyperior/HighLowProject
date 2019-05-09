<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div v-if="isRunning">
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
            this.$store.dispatch("getQuestions", {amount: 100, difficulty: 0, category: 0});

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
            }
        }
    }
</script>
<style scoped>
</style>