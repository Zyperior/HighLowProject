<template>    
    <div id="navBar">
        <div>
            <router-link to="/">Home</router-link>
        </div>
        <div>
            <router-link to="/about">About</router-link>
        </div>
        <div>
            <router-link to="/bots">Bots</router-link>
        </div>
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

     #navBar {
        margin: auto;
        width: 90%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }


    #navBar div {
        padding: 1em;
    }

</style>
