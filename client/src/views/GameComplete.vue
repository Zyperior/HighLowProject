<template>
    <div v-show="gameCompleted">
        <div v-for="(player,index) in players">
            <h3>{{index+1}}.</h3> {{ player.name }} {{ player.score}} <br>
            Guesscount: {{player.guessCount}}
        </div>
        <router-link to="/">Play again</router-link>
    </div>
</template>

<script>
    export default {
        name: 'GameComplete',
        computed: {
            gameCompleted(){
                return this.$store.getters.isGameCompleted;
            }
        },
        created: {
            players(){
                return this.$store.getters.getPlayers().sort((p1, p2) => {
                    if(p1.score > p2.score) return -1;
                    if(p1.score < p2.score) return 1;
                    return 0;
                })
            }
        }


    }
</script>

<style scoped>
 h3{
     display: inline-block;
 }
</style>
