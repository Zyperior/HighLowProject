<template>
    <div>
        <div>Questions:</div>
        <number-of-questions @changeAmountQuestions="changeAmountOfQuestions" />
        <questions-category @changeCategory="changeCategory" />
        <questions-difficulty @changeDifficulty="changeDifficulty" />
        <div>Players & Bots:</div>
        <number-of-players @changePlayerAmount="changePlayerAmount" />
        <bot-settings @botComment="botComment" />
        <shuffle-order @shuffle="shufflePlayers" />
        <div>Other settings:</div>
        <mic-input-language @changeMicLanguage="changeMicLanguage" />
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
