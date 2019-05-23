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
        <div class="statistics" v-show="typeof botInfo != 'promise'">
            <p>Correct answer percentage: {{percentage}}%</p> <!-- Gt this from DB -->
            <p>Total of games played: {{botInfo.gamesPlayed}}</p>
            <p>Total amount of guesses: {{botInfo.guessCounter}}</p>
            <p>Total amount of points: {{botInfo.points}}</p>

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
        },
        data(){
            return {
                botInfo: {}
            }
        },
        computed: {
            percentage(){
                if(this.botInfo.guessCounter > 0) {
                     return Math.floor((this.botInfo.correctAnswers / this.botInfo.guessCounter) * 100);
                }
                else
                    return 0;
            }
        },
        async created(){
            this.botInfo = await this.$store.dispatch('botStats/getBotStats', this.bot.name)
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