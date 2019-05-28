<template>
    <div>
        <button v-if="directive === 'add'" @click="addAvailableBotToPlayingBots"><img src="../../../assets/arrow-up.png" alt="arrowUp"></button>
        <button v-if="directive === 'remove'" @click="addPlayingBotToAvailableBots"><img src="../../../assets/arrow-down.png" alt="arrowDown"></button>
    </div>
</template>

<script>
    export default {
        name: "AddRemoveBotButton",
        props: {
            directive:{
                type: String,
                required: true
            }
        },
        methods:{
            addAvailableBotToPlayingBots(){
                this.$emit('addAvailableToPlaying')
            },
            addPlayingBotToAvailableBots(){
                this.$emit('addPlayingToAvailable')
            },
        },
    }
</script>

<style scoped>
    img {
        width: 15%;
    }
</style>
