<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div v-show="isRunning">            <!-- v-show är bättre än v-if??? -->
            <input v-model="answer" name="answer" placeholder="Enter your answer">
            <button @click="submitAnswer()">Submit Answer</button>

            <Timer ref="myTimer"/>
        </div>
        <button v-show="startStage" @click="startGame()">Start Game</button>        <!-- v-show är bättre än v-if??? -->
    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'

    export default {
        methods: {
            startGame() {               
                this.$store.commit('startGame');
                this.$refs.myTimer.startTimer();
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
        },

        components: {
            Timer
        }
    }
</script>
<style scoped>
</style>