<template>    
    <div id="navBar">
        <div>
            <router-link to="/start">Home</router-link>
        </div>
        <div>
            <router-link to="about">About</router-link>
        </div>
        <div>
            <router-link to="/bots">Bots</router-link>
        </div>        
    </div>
</template>

<script>
    export default {
        name: "NavBar"
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
        /* font-size: 3vw; */
        padding: 1em;
    }

</style>
