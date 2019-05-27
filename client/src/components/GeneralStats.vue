<template>
<div>
    <div v-if="stats.totalGuesses > 0">
        <div>Games played:</div><div>{{stats.gamesPlayed}}</div>
        <div>Total questions:</div><div>{{stats.questionsAsked}}</div>
        <div>Total guesses:</div><div>{{stats.totalGuesses}}</div>
        <div>Guess / question:</div><div>{{averageGuesses}}</div>

    </div>
    <div>
        Top players:
        <p v-for="(user, index) in users">{{index+1}}. {{user.username}} {{user.points}} points</p>
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
                users: []
            }

        },
        computed:{
            averageGuesses: function(){
                return Math.round(this.stats.totalGuesses / this.stats.questionsAsked);
            }
        },
        created() {

            this.$store.dispatch('userStats/getTopUsers', 10)
                .then(users => this.users = users)
                .catch(err => console.log(err))

            this.$store.dispatch('generalStats/getDBData');

            setTimeout(()=>{
                this.stats = this.$store.getters['generalStats/getStats'];
            }, 500);
        }
    }
</script>

<style scoped>

</style>
