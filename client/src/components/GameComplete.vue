<template>
    <div>
        <div v-for="player in players">
            <p>{{ player.name }} guessed {{ player.guessCount}} times this match </p>
            <p>{{ player.name }} earned {{ player.score}} points </p>
        </div>
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