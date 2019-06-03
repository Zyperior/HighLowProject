<template>
    <div>
        <img alt="unmute" src="/soundfx/Mute_Icon.svg" v-if="mute"  @click="muteSound()"/>
        <img alt="mute" src="/soundfx/Speaker_Icon.svg" v-if="!mute"  @click="muteSound()"/>
    </div>
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
            }
        }
    }
</script>

<style scoped>
    button{
        max-height: 50px;
    }
</style>
