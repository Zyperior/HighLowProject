<template>
    <div class="settingsContainer">
        <p id="amountText">Number of Questions</p>
        <p id="categoryText">Question category</p>
        <p id="difficultyText">Choose difficulty</p>
        <p id="shuffleText">Shuffle player start order</p>
        <p id="extraPlayersText">Extra players</p>
        <number-of-questions id="amount" @changeAmountQuestions="changeAmountOfQuestions" />
        <questions-category id="category" @changeCategory="changeCategory" />
        <questions-difficulty id="difficulty" @changeDifficulty="changeDifficulty" />

        <number-of-players id="playerAmount" @changePlayerAmount="changePlayerAmount" />
        <bot-settings id="botContainer" @botComment="botComment" />
        <shuffle-order id="shuffle" @shuffle="shufflePlayers" />

        <mic-input-language id="language" @changeMicLanguage="changeMicLanguage" />
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

    export default {
        name: "Settings",
        components:{
            'shuffle-order' : ShuffleOrder,
            'number-of-questions': NumberOfQuestions,
            'questions-category' : QuestionCategory,
            'questions-difficulty' : QuestionDifficulty,
            'number-of-players' : NumberOfPlayers,
            'mic-input-language' : MicInputLang,
            'bot-settings': BotSettings
        },
        methods:{
            changeAmountOfQuestions(value) { Settings.setQuestionsAmount(value) },
            changeCategory(value) { Settings.setQuestionsCategory(value) },
            changeDifficulty(value) { Settings.setQuestionsDifficulty(value) },
            changePlayerAmount(value) { Settings.setPlayerAmount(value) },
            botComment(value) { Settings.setBotCommentary(value) },
            shufflePlayers(value) { Settings.setShufflePlayers(value) },
            changeMicLanguage(value) { Settings.setMicInputLanguage(value) }
        }
    }
</script>

<style scoped>
    .settingsContainer{
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-template-rows: repeat(9, auto);
        align-items: center;
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
        grid-column: 1 / span 2;
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
