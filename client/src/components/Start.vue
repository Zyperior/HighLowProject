<template>
    <div v-show="startStage" id="startStage">
        <h1>Start Page</h1>

        <button @click="startGame()">Start Game</button>
        <button @click="displaySettings = !displaySettings">Change game settings</button>

        <div v-show="displaySettings">
            <p>Det kommer behöva finnas minst 5 frågor i varje svårighetsgrad om amount of questions bredden är till exempel 5. Tills dess laddar den in så många som den hittar</p>
            <br><br>

            <h3>Questions</h3>

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

            <br><br>
            <h3>Bots</h3>
        </div>

    </div>
</template>

<script>
    //import Timer from '@/components/Timer.vue'

    export default {
        name: "Start",
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
                //this.$refs.myTimer.startTimer();
            }
        },
        computed: {
            startStage() {
                return this.$store.getters.getStartStage;
            }
        },
        // components: {
        //     Timer
        // }

    }
</script>

<style scoped>
    /*placerar settings knappen under start knappen*/
    /*kan ta bort det när vi börjar styla programmet*/
    #startStage{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>