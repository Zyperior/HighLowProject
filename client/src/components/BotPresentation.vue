<template>
    <div>
        <h1>{{bot.name}}</h1>
        <p><i>{{bot.phrases.thisBotWinGame}}</i></p>
        <img :src="bot.imgSrc">

        <h4>{{bot.description.blurb}}</h4>
        <p><b>Type:</b> {{bot.description.type}}</p>
        <p><b>Likes:</b> {{bot.description.likes}}</p>
        <p><b>Dislikes:</b> {{bot.description.dislikes}}</p>
        <p>{{bot.behavior}}</p>
    </div>

</template>

<script>
    export default {
        name: "BotPresentation",
        props: {
            bot: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    img{
        width: 20%;
        height: 15%;
        border: 1px solid black;
    }
    p{

    }

</style>