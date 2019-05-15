<template>
    <div>
        <h1>{{bot.name}}</h1>
        <p><i>{{bot.phrases.thisBotWinGame}}</i></p>
        <hr>
        <img :src='bot.imgSrc'/>
        {{bot.imgSrc}}
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
        }
    }
</script>

<style scoped>

</style>