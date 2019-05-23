<template>
    <div class="rules">
        <div class="title">Rules for High/Low</div>
        <div class="info">
            First player guesses the numerical answer to the question.
            If it's incorrect, the next player gets a turn, in order.
            Information about a guess being too high or too low is given.

            When a player guesses correctly, he's given points.
            The player with the most points at the end of the game wins.
        </div>
        <br><br>
        <div class="title">How to play</div>
        <div class="info">
            When it's your turn, enter a guess in the input field.
            Press the Submit-button or Enter-key.

            Alternatively, use speech-to-text.
            Click the Push To Talk-button and say your answer.
            You can change speech language in the settings.

            When the timer reaches zero, you lose your turn.
        </div>
    </div>
</template>

<script>
    export default {
        name: "Rules"
    }
</script>

<style scoped>
    .rules{
        display:grid;
        justify-content: center;
        margin: 1em;
    }

    .title {
        text-decoration: underline;
    }

    .info{
        text-align: left;
        margin-top: 1vmax;
        white-space: pre-line;
    }

</style>