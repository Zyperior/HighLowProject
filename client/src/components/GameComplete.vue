<template>
    <div>
        <div v-for="player in players">
            {{ player.name }} guessed {{ player.guessCount}} times this match
            {{ player.name }} earned {{ player.score}} points
        </div>
        <router-link to="/">Play again</router-link>
    </div>
</template>

<script>
    export default {
        name: 'GameComplete',
        computed: {
            players(){
                return this.$store.getters.getActivePlayers
            }
        }

    }
</script>

<style scoped>

</style>