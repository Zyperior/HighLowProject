<template>
    <div>
        <h1>Game Page</h1>
        <p>{{currentQuestion}}</p>
        <div v-show="isRunning">
            <p>Highest Guess: {{highGuess[0]}} </p>
            <p>Lowest Guess: {{lowGuess[0]}} </p>
            <p>{{players[0].name}}: {{players[0].answer}}</p>
            <p>{{players[1].name}}: {{players[1].answer}}</p>
            <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name="answer" placeholder="Enter your answer">
            <button @click="submitAnswer(answer)">Submit Answer</button>

            <Timer ref="myTimer"/>
        </div>

        <div v-show="startStage" id="startStage">
            <button @click="startGame()">Start Game</button>
            <button @click="displaySettings = !displaySettings">Change game settings</button>

            <div v-show="displaySettings">

                <p>Amount of questions:</p>
                <select v-model="questionSettings.amount">
                    <option v-for="(amountOption, index) in amountOptions" :value="++index">
                        {{ amountOption }}
                    </option>
                </select>

                <p>Question category:</p>
                <select v-model="questionSettings.category">
                    <option v-for="(categoryOption, index) in categoryOptions" :value="index">
                        {{ categoryOption }}
                    </option>
                </select>

                <p>Question difficulty:</p>
                <select v-model="questionSettings.difficulty">
                    <option v-for="(difficultyOption, index) in difficultyOptions" :value="index">
                        {{ difficultyOption }}
                    </option>
                    
                </select>
            </div>
        </div>


    </div>
</template>
<script>
    import Timer from '@/components/Timer.vue'

    export default {
        data(){
          return{
              displaySettings: false,
              difficultyOptions: [
                  "Mixed", "Easy", "Medium", "Hard"
              ],
              categoryOptions: [
                  "Mixed", "Animals", "Science", "History", "Literature", "Games", "Miscellaneous"
              ],
              amountOptions: Array.from({length: 5}, (v, i) => ++i), //[1, 2, 3, 4, 5]
              questionSettings: {
                  amount: 3,
                  difficulty: 0,
                  category: 0
              }
          }
        },
        methods: {
            startGame() {
                this.$store.dispatch("loadQuestionsAndStartGame", this.questionSettings);


                this.$refs.myTimer.startTimer();
            },
            submitAnswer(a) {
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

        components: {
            Timer
        }
    }
</script>
<style scoped>

    /*placerar settings knappen under start knappen*/
    /*ni kan ta bort det här sedan när vi börjar styla programmet*/
    #startStage{
        display: flex;
        flex-direction: column;
        align-items: center;
    }


</style>