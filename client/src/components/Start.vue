<template>
    <div id="startStage">
        <router-link to="game"><button @click="startGame">Start Game</button></router-link>
        <br><br>
        <button class="smallerButton" @click="$router.push('/settings')">Change game settings</button>
        <br>
        <img id="logo" src="../assets/IpfadodLogo.svg">
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

    .smallerButton {
        background: none;
        text-decoration: underline;
        border-style: none;
        margin: 0;
        padding: 0;
        width: auto;

    }


    .smallerButton:hover {
        cursor: pointer;
    }


    img {
        width: 15%;
    }

    #logo{
        width: 23em;
        height: 25em;
    }

    h3 {
        text-decoration: underline;
    }


    .infoDiv div {
        margin: 1em;
    }


    .availableDiv {
        margin: 1em;
    }


    #lastSelect {
        margin-bottom: 2em;
    }


    @media (max-width: 767px) {

        .selectDiv select {
            width: 50%;
            font: var(--fonts);
            font-size: var(--defaultFontSizeMobile);
            color: var(--defaultFontColor);
        }


        .selectViewDiv select {
            width: 65%;
            font: var(--fonts);
            font-size: var(--defaultFontSizeMobile);
            color: var(--defaultFontColor);
        }

    }


    @media (min-width: 768px) {

        .selectDiv select {
            width: 50%;
            font: var(--fonts);
            font-size: var(--defaultFontSize);
            color: var(--defaultFontColor);
        }


        .selectViewDiv select {
            width: 65%;
            font: var(--fonts);
            font-size: var(--defaultFontSize);
            color: var(--defaultFontColor);
        }

    }


</style>
