<template>
    <div id="startStage">
        <router-link to="game"><button @click="startGame">Start Game</button></router-link>
    </div>
</template>

<script>
    export default {
        name: "Start",
        methods: {
            startGame() {
                this.$store.dispatch("loadGame");
            },
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
