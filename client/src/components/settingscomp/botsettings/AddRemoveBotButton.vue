<template>
    <div>
        <img src="../../../assets/leftArrow.svg" alt="arrowUp" v-if="directive === 'add'" @click="addAvailableBotToPlayingBots" />
        <img src="../../../assets/arrowRight.svg" alt="arrowDown" v-if="directive === 'remove'" @click="addPlayingBotToAvailableBots" />
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

</style>
