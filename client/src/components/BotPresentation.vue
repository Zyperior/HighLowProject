<template>
    <div class="container">
        <div class="bot-img">
        <img :src="bot.imgSrc" >
        </div>

        <div class="bot-title">
        <h1>{{bot.name}}</h1>
        <h4>{{bot.description.blurb}}</h4>
            <p><i>"{{bot.phrases.thisBotWinGame}}"</i> - {{bot.name}}</p>
            <div class="statistics">
                <p><b>Correct answer percentage:</b> <br>{{percentage}}%</p>
                <p><b>Total of games played: </b><br>{{botInfo.gamesPlayed}}</p>
                <p><b>Total amount of guesses: </b><br>{{botInfo.guessCounter}}</p>
                <p><b>Total amount of points: </b><br>{{botInfo.points}}</p>
            </div>
        </div>
        <div class="info">
        <p><b>Type:</b> {{bot.description.type}}</p>
        <p><b>Likes:</b> {{bot.description.likes}}</p>
        <p><b>Dislikes:</b> {{bot.description.dislikes}}</p>
        <p>{{bot.behavior}}</p>
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
            percentage() {  //Correct answer percentage, how many correct guesses split with total number of guesses
                if (this.botInfo.guessCounter > 0) {
                    return Math.floor((this.botInfo.correctAnswers / this.botInfo.guessCounter) * 100);
                }
                else
                    return 0;
            }
        },

            methods: { //Gets Bot-statistics from DB
                async getBot(){
                    this.botInfo = await this.$store.dispatch('botStats/getBotStats', this.bot.name)
                }
        },
        created(){
            this.getBot();
        },
        watch: {
            bot(){
                this.getBot();            //If prop 'bot' changes, get that bot from the DB
            }
        }

    }
</script>

<style scoped>
    .container {
        display: grid;
        height: 600px;
        grid-template-columns: 18em 1fr;
        grid-template-rows: 19em 3fr;
        overflow: hidden;
    }

    .bot-img {
        grid-row: 1/2;
        grid-column: 1/2;
        width: 18em;
        height: 19em;
    }

    .bot-img img {
        width: 100%;
        height: 100%;
    }

    .statistics {
        overflow:hidden;
        text-align: center;
        width: 50%;
        margin-left: 25%;
        padding: 0;
        border: 1px solid black;
    }

    .statistics p {
        display: block;
    }

    .info {
        grid-row: 2/3;
        grid-column: 1/2;
        text-align: left;
    }

    .info p {
        padding: 0;
        margin-bottom: 0.5em;
    }

    .bot-title {
        margin-top: 12%;
        grid-row: 1/3;
        grid-column: 2/3;
        width: 90%;
        margin-left: 12%;
        text-align: center;
    }

    .bot-title h1 {
        margin-bottom: 5%;
    }

    .bot-title p {

    }
    @media(max-width: 415px) {
        .container {
            grid-template-columns: 10em 1fr;
            grid-template-rows: 15em 3fr;
        }

        .bot-img {
            width: 10em;
            height: 15em;
        }


        .statistics {
            text-align: center;
            height: 100%;
            width: 100%;
            margin-bottom: 50%;
            margin-left: 0;
            border: 0;
        }
        .info p {
            padding: 0;
            margin: 1em;
            font-size: small;
        }
        .statistics p{
            padding: 0.5em;
        }
        .bot-title {
            margin-left: 0;
            width: 100%;
        }

    }


</style>