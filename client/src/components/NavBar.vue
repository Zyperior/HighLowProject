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
        <div>
            <router-link to="/settings">Settings</router-link>
        </div>
        <mute-sound-button />
    </div>
</template>

<script>
    import MuteSoundButton from './MuteSoundButton'

    export default {
        name: "NavBar",
        components:{
            'mute-sound-button': MuteSoundButton
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
