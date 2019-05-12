<template>
    <div v-show="startStage" id="startStage">
        <h1>Start Page</h1>

        <button @click="startGame()">Start Game</button><br>
        <button @click="displaySettings = !displaySettings">Change game settings</button>

        <div v-show="displaySettings">
            <br>
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
            <i>Select bots and use the arrows to choose which ones to play against.</i><br>
            <i>Hover over a bot to read its description.</i>

            <br><br><b>Playing bots (1-5)</b><br><br>
            <select size="5" v-model="selectedPlayingBot">
                <option v-for="(playingBot, index) in playingBots" :value="index">
                    {{ playingBot.name }}
                </option>
            </select>

            <br><br>
            <button><img src="../assets/arrow-up.png" alt="arrowUp"></button>
            <button><img src="../assets/arrow-down.png" alt="arrowDown"></button>

            <br><br><b>Available bots</b><br><br>
            <select size="5" v-model="selectedAvailableBot">
                <option v-for="(availableBot, index) in availableBots" :value="index">
                    {{ availableBot.name }}
                </option>
            </select>

        </div>

    </div>
</template>

<script>

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
                },
                selectedAvailableBot: "",
                selectedPlayingBot: ""
            }
        },
        methods: {
            startGame() {
                this.$store.dispatch("loadQuestionsAndStartGame", this.questionSettings); //promise error?
            }
        },
        computed: {
            startStage(){
                return this.$store.getters.getStartStage;
            },
            availableBots(){
                return this.$store.getters.availableBots;
            },
            playingBots(){
                return this.$store.getters.playingBots;
            }
        },


    }
</script>

<style scoped>
  /*Jag har lagt till några <br> (linebreak) i template koden för att saker ska hamna på nya rader.
  Helt ok att ta bort dem för den som sedan stylar programmet*/

    img{
        width: 1em;
    }
</style>