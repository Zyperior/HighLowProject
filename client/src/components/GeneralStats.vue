<template>
    <div>
        <div>Games played: {{stats.gamesPlayed}}</div>
        <div>Total questions asked: {{stats.questionsAsked}}</div>
        <div>Total guesses made: {{stats.totalGuesses}}</div>
        <div>Average guesses / question: {{stats.totalGuesses / stats.questionsAsked}}</div>
    </div>
</template>

<script>
    import Store from '../store'

    export default {
        name: "GeneralStats",
        data: function(){
            return {
                stats : {totalGuesses:0, questionsAsked: 0}
            }

        },
        created() {

            this.$store.dispatch('generalStats/getDBData');

            setTimeout(()=>{
                this.stats = this.$store.getters['generalStats/getStats'];
            }, 500);
        }
    }
</script>

<style scoped>

</style>
