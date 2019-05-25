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
        <div>
            <router-link to="/login">Login</router-link>
        </div>

        <div>
            <router-link to="/auth-test">AuthenticationTest</router-link>
        </div>
        <div v-show="this.$store.getters.displayExclusivePages.loggedInUser">
            <router-link to="/secret-page">OnlyLoggedInUsersCanSeeThis</router-link>
        </div>
        <div v-show="this.$store.getters.displayExclusivePages.admin">
            <router-link to="/super-secret-page">OnlyLoggedInAdminCanSeeThis</router-link>
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
        padding: 1em;
    }

</style>
