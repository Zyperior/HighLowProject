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
                return this.$store.getters.getActivePlayers.sort((p1, p2) => {
                    if(p1.score > p2.score) return -1;
                    if(p1.score < p2.score) return 1;
                    return 0;
                })
            },
            displayGameCompleteResults(){
                return this.$store.getters.getDisplayGameCompleteResults;
            }
        },


    }
</script>

<style scoped>

</style>