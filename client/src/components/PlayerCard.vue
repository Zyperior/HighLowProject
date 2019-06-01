<template>
    
    <div id="container" :class="{humanPlayer: player.isHuman}">

        <div id="image">
            <img v-if="!player.isHuman" :src="player.imgSrc" alt="Bot image">
            <img v-else src="../assets/avatar.svg" alt="Guest/user image">
        </div>

        <div id="playerName">
            <p>{{ player.name }}</p>
        </div>

        <div id="latestGuessHeading">
            <p>Latest guess:</p>
        </div>

        <div id="latestGuess">
            <p>{{ showAnswer(player.answer) }}</p>
        </div>

    </div>

</template>


<script>

    export default {

        props: [
            "player"
        ],
        

        methods: {

            showAnswer: function(answer) {

                if (answer >= 0) {
                    return answer;
                }

                else {

                    return "PASS";

                }

            }

        }    
        
    }

</script>


<style scoped>


    * {
        box-sizing: border-box;
    }


    #image {
        grid-area: image;
        position: relative;
    }


    #playerName {
        grid-area: playerName;
        font-weight: bold;
    }


    #latestGuessHeading {
        grid-area: latestGuessHeading;
    }


    #latestGuess {
        grid-area: latestGuess;        
    }


    #container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 28.125% 67.1875%;
        grid-template-rows: repeat(3, 30%);
        justify-content: space-evenly;
        align-content: center;
        grid-template-areas:
            'image playerName'
            'image latestGuessHeading'
            'image latestGuess';
        background-color: var(--botCardColor);
    }


    #container.humanPlayer {
        background-color: var(--humanCardColor);
    }


    p {
        padding: 0px;
        vertical-align: middle;
        font-size: 75%;
        text-align: center;
    }


    img {
        max-height: 100%;
        max-width: 100%;
        border: 1px solid black;
        margin: auto;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


</style>