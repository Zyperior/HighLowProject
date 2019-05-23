<template>    
    <div id="navBar">
        <div>
            <router-link to="/">Home</router-link>
        </div>
        <div>
            <router-link to="/rules">Rules</router-link>
        </div>
        <div>
            <router-link to="/about">About</router-link>
        </div>
        <div>
            <router-link to="/bots">Bots</router-link>
        </div>
        <button @click="muteSound()">{{ mute }}</button>        
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            muteSound() {
                this.$store.commit('muteSound')
            }
        },
        computed: {
            mute() {
                return this.$store.getters.getMuteSound
                ? 'Enable sound' : 'Mute sound'
            }
        }
    }
</script>

<style scoped>

     #navBar {
        margin: auto;
        width: 90%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }


    #navBar div {
        padding: 1em;
    }

</style>
