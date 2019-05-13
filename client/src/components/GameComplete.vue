<template>
    <div>
        {{players[0].name}} guessed {{players[0].guessCount}} times this match
        <br>
        <br>
        {{players[1].name}} guessed {{players[1].guessCount}} times this match
    </div>
</template>

<script>
    export default {
        name: 'GameComplete',
        computed: {
            players(){
                return this.$store.getters.getPlayers
            }
        }

    }
</script>

<style scoped>

</style>