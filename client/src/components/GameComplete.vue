<template>
    <div v-show="displayGameCompleteResults">
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
            },
            displayGameCompleteResults(){
                return this.$store.getters.getDisplayGameCompleteResults;
            }
        },


    }
</script>

<style scoped>

</style>