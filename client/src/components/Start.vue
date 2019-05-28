<template>
    <div id="startStage">
        <router-link to="game"><button @click="startGame">Start Game</button></router-link>
        <br><br>
        <button class="smallerButton" @click="$router.push('/settings')">Change game settings</button>
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

    .smallerButton{
        background: none;
        text-decoration: underline;
        border-style: none;
        margin: 0;
        padding: 0;
        width: auto;
    }
    .smallerButton:hover{
        cursor: pointer;
    }

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
