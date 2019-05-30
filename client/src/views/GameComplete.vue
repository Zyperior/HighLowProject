<template>
    <div >
        <div class="scoreGrid" v-for="(player,index) in players">
            <div class="scoreLine">
                <div class="name">{{index+1}}. {{ player.name }}</div>
                <div class="score">{{player.score}}</div>
            </div>
        </div>
        <router-link to="/">Play again</router-link>
    </div>
</template>

<script>
    export default {
        name: 'GameComplete',
        computed: {
            players(){
                const players = this.$store.getters.getPlayers.slice();
                return players.sort((p1, p2) => {
                    if(p1.score > p2.score) return -1;
                    if(p1.score < p2.score) return 1;
                    return 0;
                })
            },
            gameCompleted(){
                return this.$store.getters.isGameCompleted;
            }
        }
    }
</script>

<style scoped>
    .scoreGrid{
        display: grid;
        width: 80%;
        margin-left: 10%;
        margin-bottom: 10%;
    }

    .scoreLine{
        display: grid;
        grid-template-columns: 80% auto;
        border-bottom: dotted rgb(205,226,203);
        margin-bottom: 5%;
    }

    .name{
        justify-self: start;
        text-align: start;
    }

    .score{
        text-align: end;
        justify-self: end;
    }
</style>
