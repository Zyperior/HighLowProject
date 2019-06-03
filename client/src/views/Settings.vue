<template>
    <div class="settingsContainer">
        <p id="amountText">Number of Questions</p>
        <p id="categoryText">Question category</p>
        <p id="difficultyText">Choose difficulty</p>
        <p id="shuffleText">Shuffle player start order</p>
        <p id="extraPlayersText">Extra players</p>
        <p id="botText">Turn Bot commentary off</p>
        <p id="micLangText">Microphone Input Language</p>
        <number-of-questions id="amount" @changeAmountQuestions="changeAmountOfQuestions" />
        <questions-category id="category" @changeCategory="changeCategory" />
        <questions-difficulty id="difficulty" @changeDifficulty="changeDifficulty" />

        <number-of-players id="playerAmount" @changePlayerAmount="changePlayerAmount" />
        <bot-settings id="botContainer" @botComment="botComment" />
        <shuffle-order id="shuffle" @shuffle="shufflePlayers" />

        <bot-commentary id="botComments" @botComment="botComment"/>
        <mic-input-language id="language" @changeMicLanguage="changeMicLanguage" />
        <router-link id="startButton" to="game"><button @click="startGame">Start Game</button></router-link>
    </div>
</template>

<script>
    import ShuffleOrder from '../components/settingscomp/ShuffleOrder';
    import NumberOfQuestions from '../components/settingscomp/NumberOfQuestions';
    import QuestionCategory from '../components/settingscomp/QuestionsCategory';
    import QuestionDifficulty from '../components/settingscomp/QuestionDifficulty';
    import NumberOfPlayers from '../components/settingscomp/NumberOfPlayers';
    import MicInputLang from '../components/settingscomp/MicInputLang';
    import BotSettings from '../components/settingscomp/botsettings/BotSettings'
    import Settings from '../modules/settingsData'
    import ChattyBots from '../components/settingscomp/botsettings/ChattyBots.vue'
    import Start from '../components/Start.vue'


    export default {
        name: "Settings",
        components:{
            'shuffle-order' : ShuffleOrder,
            'number-of-questions': NumberOfQuestions,
            'questions-category' : QuestionCategory,
            'questions-difficulty' : QuestionDifficulty,
            'number-of-players' : NumberOfPlayers,
            'mic-input-language' : MicInputLang,
            'bot-settings': BotSettings,
            'bot-commentary': ChattyBots,
            'start': Start
        },
        methods:{
            changeAmountOfQuestions(value) { Settings.setQuestionsAmount(value) },
            changeCategory(value) { Settings.setQuestionsCategory(value) },
            changeDifficulty(value) { Settings.setQuestionsDifficulty(value) },
            changePlayerAmount(value) { Settings.setPlayerAmount(value) },
            botComment(value) { Settings.setBotCommentary(value) },
            shufflePlayers(value) { Settings.setShufflePlayers(value) },
            changeMicLanguage(value) { Settings.setMicInputLanguage(value) },
            setBotComment(value) { this.$emit('botComment', value) },
            startGame() { this.$store.dispatch("loadGame"); },
        }
    }
</script>

<style scoped>
    .settingsContainer{
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(10, auto);
        align-items: center;
        padding: 0px 15px 0px 15px;
    }

    #shuffleText{
        grid-row: 4;
        grid-column: 1;
        justify-self: start;
        margin-right: 10px;
        font-size: 14px;
    }

    #amountText{
        grid-row: 1;
        grid-column: 1;
        justify-self: start;
        margin-right: 10px;
        font-size: 14px;
    }

    #startButton{
        grid-row: 10;
        grid-column: 1 / span 2;
    }

    #difficulty{
        grid-row: 3;
        grid-column: 2;
        justify-self: start;
    }

    #difficultyText{
        grid-row: 3;
        grid-column: 1;
        justify-self: start;
        margin-right: 10px;
        font-size: 14px;
    }

    #categoryText{
        grid-row: 2;
        grid-column: 1;
        justify-self: start;
        margin-right: 10px;
        font-size: 14px;
    }

    #amount{
        grid-row: 1;
        grid-column: 2;
        justify-self: start;

    }

    #category{
        grid-row: 2;
        grid-column: 2;
        justify-self: start;
    }

    #botContainer{
        grid-row: 7;
        grid-column: 1 / span 2;
    }

    #shuffle{
        grid-row: 4;
        grid-column: 2;
        justify-self: start;
    }

    #language{
        grid-row: 9;
        grid-column: 2;
        font-size: 14px;
        justify-self: start;
    }

    #micLangText{
        grid-row: 9;
        grid-column: 1;
        justify-self: start;
        font-size: 14px;
        margin-right: 10px;
    }

    #botText{
        grid-row: 8;
        grid-column: 1;
        justify-self: start;
        font-size: 14px;
        margin-right: 10px;
    }

    #botComments{
        grid-row: 8;
        grid-column: 2;
        font-size: 14px;
        justify-self: start;
    }

    #playerAmount{
        grid-row: 5;
        grid-column: 2;
        justify-self: start;
    }

    #extraPlayersText{
        grid-row: 5;
        grid-column: 1;
        justify-self: start;
        font-size: 14px;
        margin-right: 10px;
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
