<template>
    <div>
    <h1>Bots</h1>
        <br>
        <hr><br>
    <div v-for="bot in bots">
        <botPresentation :bot="bot"></botPresentation><br>
        <hr>
    </div>
    </div>
</template>

<script>
    import botPresentation from '../components/BotPresentation.vue'

    export default {
        name: "botsProfile",
        components:{
            botPresentation
        },
        computed: {
            bots(){
                return this.$store.getters.bots;
            }
        }
    }
</script>

<style scoped>
</style>