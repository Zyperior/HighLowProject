<template>
    <div v-show="isRunning">
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div>
            <p>Highest Guess: {{highGuess[0]}} </p>
            <p>Lowest Guess: {{lowGuess[0]}} </p>
            <p>{{players[0].name}}: {{players[0].answer}}</p>
            <p>{{players[1].name}}: {{players[1].answer}}</p>
            <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer">
            <div>
                <button @click="submitAnswer(answer)">Submit Answer</button>
                <audio ref="audioTest" src="/testAudio.wav"></audio>
            </div>
            

            <Timer ref="myTimer"/>
        </div>




    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'
    export default {
        methods: {
            submitAnswer(a) {
                this.$refs.audioTest.play();
                this.$store.commit('submitAnswer', a);
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
                return this.$store.getters.getPlayers
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