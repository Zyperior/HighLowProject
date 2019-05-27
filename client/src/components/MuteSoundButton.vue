<template>
    <button @click="muteSound()">{{ mute }}</button>
</template>

<script>
    export default {
        name: "MuteSoundButton",
        methods: {
            muteSound() {
                this.$store.commit('muteSound')
            }
        },
        computed: {
            mute() {
                return this.$store.getters.isMuteSound
                    ? 'Enable sound' : 'Mute sound'
            }
        }
    }
</script>

<style scoped>
    button{
        max-height: 50px;
    }
</style>
