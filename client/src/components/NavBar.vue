<template>
    <div>
        <router-link to="/start">Home</router-link>
        <router-link to="about">About</router-link>
        <router-link to="/bots">Bots</router-link>
        <button @click="muteSound()">Mute Sound</button>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            muteSound() {
                this.$store.commit('muteSound');
            }
        }
    }
</script>

<style scoped>

</style>
