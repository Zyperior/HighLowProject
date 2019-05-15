<template>
    <div>
        <h1>{{bot.name}}</h1>
        <p><i>{{bot.phrases.thisBotWinGame}}</i></p>
        <hr>
        <img :src="bot.imgSrc">

        <p>About: {{bot.behavior}}</p>
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
        computed: {
            imgPath(){
                console.log(this.bot.imgSrc);
                return this.bot.imgSrc;
            }
        }
    }
</script>

<style scoped>
    img{
        width: 20%;
        height: 15%;
    }
    p{

    }

</style>