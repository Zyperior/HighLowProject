<template>
    <div id="startStage">
        <h1>Start Page</h1>

        <router-link to="game"><button @click="startGame(); createPlayers(playerNr);">Start Game</button></router-link>
        <br>
        <button @click="displaySettings = !displaySettings">Change game settings</button>

        <div v-show="displaySettings">
            <input v-model="shuffleOrder" type="checkbox" name="shuffle" value="true">Shuffle start order
            <br><h3>Questions</h3>

            <p>Amount of players:</p>
            <select v-model="playerNr">
                <option v-for="(playersAmount, index) in playersAmount" :value="++index">
                    {{ playersAmount }}
                </option>
            </select>

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

            
            <br><br><h3>Bots</h3>
            <i>Select bots and use the arrows to choose which ones to play against.</i><br>
            <i>Hover over a bot to read its description.</i>

            <br><br><b>Playing bots (1-5)</b><br><br>
            <select size="5" v-model="selectedPlayingBotIndex">
                <option v-for="(playingBot, index) in playingBots"
                        :value="index"
                        :title="'Difficulty: ' + playingBot.difficulty + '\nBehavior: ' + playingBot.behavior">
                    {{ playingBot.name }}
                </option>
            </select>

            <br><br>
            <button @click="addAvailableBotToPlayingBots"><img src="../assets/arrow-up.png" alt="arrowUp"></button>
            <button @click="addPlayingBotToAvailableBots"><img src="../assets/arrow-down.png" alt="arrowDown"></button>

            <br><br><b>Available bots</b><br><br>
            <select size="5" v-model="selectedAvailableBotIndex">
                <option v-for="(availableBot, index) in availableBots"
                        :value="index"
                        :title="'Difficulty: ' + availableBot.difficulty + '\nBehavior: ' + availableBot.behavior">
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
                playersAmount: [1, 2, 3, 4, 5, 6],
                playerNr: 1,
                amountOptions: Array.from({length: 5}, (v, i) => ++i), //[1, 2, 3, 4, 5]
                questionSettings: {
                    amount: 3,
                    difficulty: 0,
                    category: 0
                },
                selectedAvailableBotIndex: "",
                selectedPlayingBotIndex: "",
                shuffleOrder: false
            }
        },
        methods: {
            startGame() {
                console.log(this.shuffleOrder);
                this.$store.dispatch("loadQuestionsAndStartGame", this.questionSettings); //promise error?
            },
            addAvailableBotToPlayingBots(){
                if(typeof this.availableBots[this.selectedAvailableBotIndex] !== "undefined"
                    && this.playingBots.length < 5)
                    this.availableBots[this.selectedAvailableBotIndex].isPlaying = true;
            },
            addPlayingBotToAvailableBots(){
                if(typeof this.playingBots[this.selectedPlayingBotIndex] !== "undefined"
                    && this.playingBots.length > 1)
                    this.playingBots[this.selectedPlayingBotIndex].isPlaying = false;
            },
            createPlayers(amount){
                this.$store.commit("resetPlayersBeforeNewGames");

                for(var i = 1; i <= amount; i++){
                    var player = {
                        name: 'Player '+i,
                        score: 0,
                        guessCount: 0,
                        score: 0,
                        isHuman: true
                    }
                    this.players.push(player);
                    this.activePlayers.push(player);
                }

                this.$store.commit('updateActivePlayers', this.playingBots);
                if(this.shuffleOrder){
                    this.shuffle(this.activePlayers);
                }
            },
            shuffle(array){
                for(var i = array.length - 1; i >= 0; i--){
                    var rand = Math.floor(Math.random() * i);
                    var temp = array[i];
                    array[i] = array[rand];
                    array[rand] = temp;
                }
            }
        },
        computed: {
            availableBots(){
                return this.$store.getters.availableBots;
            },
            playingBots(){
                return this.$store.getters.playingBots;
            },
            players(){
                return this.$store.getters.getPlayers;
            },
            activePlayers(){
                return this.$store.getters.getActivePlayers;
            }
        },
    }
</script>

<style scoped>
  /*Jag har lagt till några <br> (linebreak) i template/html koden för att saker ska hamna på nya rader.
  Helt ok att ta bort dem för den som sedan stylar programmet*/

    img{
        width: 1em;
    }
</style>