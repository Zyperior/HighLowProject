<template>
    <div class="container">
        <div class="info">
        <h1>{{bot.name}}</h1>
        <p><i>{{bot.phrases.thisBotWinGame}}</i></p>
        <img :src="bot.imgSrc">

        <h4>{{bot.description.blurb}}</h4>
        <p><b>Type:</b> {{bot.description.type}}</p>
        <p><b>Likes:</b> {{bot.description.likes}}</p>
        <p><b>Dislikes:</b> {{bot.description.dislikes}}</p>
        <p>{{bot.behavior}}</p>
        </div>
        <div class="statistics">
            <p>Correct answer percentage: 0.0%</p> <!-- Get this from DB -->
            <p>Total of games played: 0</p>
            <p>Total amount of guesses: 0</p>
            <p>Total amount of points: 0p</p>
        </div>
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
    .container{
      text-align: center;
    }
    img{
        width: 25%;
        height: 20%;
        border: 1px solid black;
    }
    .statistics{
        width: 25%;
        margin-left: 37%;
        border: 1px solid black;
    }
    .info{
    }
    div {

    }

</style>