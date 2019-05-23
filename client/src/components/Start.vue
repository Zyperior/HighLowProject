<template>
    <div id="startStage">
        <h1>Start Page</h1>

        <router-link to="game"><button @click="startGame(); createPlayers(playerNr);">Start Game</button></router-link>
        <!-- <br> -->
        <button @click="displaySettings = !displaySettings">Change Game Settings</button>

        <div v-show="displaySettings">
            <input v-model="shuffleOrder" type="checkbox" name="shuffle" value="true">Shuffle start order
            <br><h3>Questions</h3>

            <p>Number of players:</p>                   <!-- Ändrade "Amount" till "Number". /Daniel -->

            <div class="selectDiv">
                <select v-model="playerNr">
                    <option v-for="(playersAmount, index) in playersAmount" :value="++index">
                        {{ playersAmount }}
                    </option>
                </select>
            </div>

            <p>Number of questions:</p>                   <!-- Ändrade "Amount" till "Number". /Daniel -->

            <div class="selectDiv">
                <select v-model="questionSettings.amount">
                    <option v-for="(amountOption, index) in amountOptions" :value="++index">
                        {{ amountOption }}
                    </option>
                </select>
            </div>

            <p>Question category:</p>

            <div class="selectDiv">
                <select v-model="questionSettings.category">
                    <option v-for="(categoryOption, index) in categoryOptions" :value="index">
                        {{ categoryOption }}
                    </option>
                </select>
            </div>

            <p>Question difficulty:</p>

            <div class="selectDiv">
                <select v-model="questionSettings.difficulty">
                    <option v-for="(difficultyOption, index) in difficultyOptions" :value="index">
                        {{ difficultyOption }}
                    </option>
                </select>
            </div>

            <p>Speech-to-text language:</p>

            <div class="selectDiv">
                <select v-model="selectedLanguage">
                    <option v-for="(speechToTextLanguageOption, index) in speechToTextLanguageOptions">
                        {{speechToTextLanguageOption}}
                    </option>
                </select>
            </div>

            
            <!-- <br><br> -->
            <h3>Bots</h3>

            <div class="infoDiv">

                <div>
                    <i>Select bots and use the arrows to choose which ones to play against.</i>
                </div>
                <div>
                    <i>Hover over a bot to read its description.</i>
                </div>
                <div>
                    <b>Playing bots (1 - 5):</b>
                </div>

            </div>
            
            <!-- <br><br> -->
            <div class="selectViewDiv">
                <select size="5" v-model="selectedPlayingBotIndex">
                    <option v-for="(playingBot, index) in playingBots"
                            :value="index"
                            :title="'Difficulty: ' + playingBot.difficulty + '\nBehavior: ' + playingBot.behavior">
                        {{ playingBot.name }}
                    </option>
                </select>
            </div>

            <!-- <br><br> -->
            <button @click="addAvailableBotToPlayingBots"><img src="../assets/arrow-up.png" alt="arrowUp"></button>
            <button @click="addPlayingBotToAvailableBots"><img src="../assets/arrow-down.png" alt="arrowDown"></button>

            <div class="availableDiv">
                <b>Available bots:</b>
            </div>

            <div class="selectViewDiv" id="lastSelect">
                <select size="5" v-model="selectedAvailableBotIndex">
                    <option v-for="(availableBot, index) in availableBots"
                            :value="index"
                            :title="'Difficulty: ' + availableBot.difficulty + '\nBehavior: ' + availableBot.behavior">
                        {{ availableBot.name }}
                    </option>
                </select>
            </div>
            <input v-model="chattyBots" type="checkbox" name="chattyBots" value="true">Chatty bots

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
                shuffleOrder: false,
                chattyBots: true,
                speechToTextLanguageOptions: [
                    "sv-SE", "en-US", "no-NO"
                ],
                selectedLanguage: "sv-SE"
            }
        },
        methods: {
            startGame() {
                console.log(this.shuffleOrder);
                this.$store.dispatch("loadQuestionsAndStartGame", this.questionSettings); //promise error?

                //Inte nöjd med att de ligger här. Finns mer elegant sätt?
                //Borde alla settings kanske ligga i store ist. för data?
                this.$store.commit("setLanguage", this.selectedLanguage);
                this.$store.commit("isBotsChatty", this.chattyBots);
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

    img {
        width: 15%;
    }


    h3 {
        text-decoration: underline;
    }

    .selectDiv select {
        width: 50%;
        font: var(--fonts);
        font-size: var(--defaultFontSizeMobile);
        color: var(--defaultFontColor);
    }

    .infoDiv div {
        margin: 1em;
    }


    .availableDiv {
        margin: 1em;
    }


    .selectViewDiv select{
        width: 65%;
        font: var(--fonts);
        font-size: var(--defaultFontSizeMobile);
        color: var(--defaultFontColor);
    }

    #lastSelect {
        margin-bottom: 2em;
    }


    @media (min-width: 768px) {

    .selectDiv select {
      font-size: var(--defaultFontSize);
    }

    .selectViewDiv select {
      font-size: var(--defaultFontSize);
    }


  }




</style>