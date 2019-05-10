<template>
    <h1>
        text header
    </h1>
    <p>
        test text
        {{players[0].answer}}
    </p>
</template>

<script>
    export default {

        computed: {
            players(){
                return this.$store.getters.getPlayers
            }
        }

    }
</script>

<style scoped>

</style>