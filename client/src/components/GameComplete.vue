<template>
    <div>
        <div v-for="player in players">
            {{ player.name }} guessed {{ player.guessCount}} times this match
            {{ player.name }} earned {{ player.score}} points
        </div>
        <div v-for="bot in bots">
            {{bot.name}} guessed {{bot.guessCount}} times this match
            {{bot.name}} earned {{bot.score}} points
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameComplete',
        computed: {
            players(){
                return this.$store.getters.players
            },
            bots(){
                return this.$store.getters.playingBots
            }
        }

    }
</script>

<style scoped>

</style>