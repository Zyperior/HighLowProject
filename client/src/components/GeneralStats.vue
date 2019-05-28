<template>
<div>
    <div v-if="stats.totalGuesses > 0">
        <div>Games played:</div><div>{{stats.gamesPlayed}}</div>
        <div>Total questions:</div><div>{{stats.questionsAsked}}</div>
        <div>Total guesses:</div><div>{{stats.totalGuesses}}</div>
        <div>Guess / question:</div><div>{{averageGuesses}}</div>

    </div>
</div>
</template>

<script>
    import Store from '../store'

    export default {
        name: "GeneralStats",
        data: function(){
            return {
                stats : {totalGuesses:0, questionsAsked: 0},
            }

        },
        computed:{
            averageGuesses: function(){
                return Math.round(this.stats.totalGuesses / this.stats.questionsAsked);
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
