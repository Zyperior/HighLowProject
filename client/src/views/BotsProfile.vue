<template>
    <div>
    <h1>This is da bottys</h1>
    <div v-for="bot in bots">
        <botPresentation :bot="bot"></botPresentation><br>
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