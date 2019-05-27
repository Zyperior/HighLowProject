<template>
    <div id="topnav">
        <div class="logoPlaceHolder">Logo</div>
        <div id="myLinks" v-if="activate === true">
            <div @clik="showMenu"><router-link to="/">Home</router-link></div>
            <div @clik="showMenu"><router-link to="/rules">Rules</router-link></div>
            <div @clik="showMenu"><router-link to="/about">About</router-link></div>
            <div @clik="showMenu"><router-link to="/bots">Bots</router-link></div>
            <div @clik="showMenu"><router-link to="/settings">Settings</router-link></div>
            <div @clik="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/profile">Profile</router-link>
            </div>
            <div @clik="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/suggest-question">Suggest a question</router-link>
            </div>
            <div @clik="showMenu" v-show="displayExclusivePages.loggedInAdmin">
                <router-link to="/admin">Admin page</router-link>
            </div>

            <div @clik="showMenu" v-show="!displayExclusivePages.loggedInUser">
                <router-link to="/login">Login</router-link>
            </div>
            <div @clik="showMenu" v-show="displayExclusivePages.loggedInUser">
                <button id="logout-button" @click="logout">Logout button</button>
            </div>
            <div>
                <p>Search for user:</p><input v-model="username">
                <button @click="searchForUser(username)">Search</button>
            </div>
        </div>
            <a href="javascript:void(0);" class="icon" @click="showMenu">
            <i class="fa fa-bars"></i>
        </a>

        <mute-sound-button id="mute" />


        <!--<div>-->
            <!--<router-link to="/auth-test">AuthenticationTest</router-link>-->
        <!--</div>-->



    </div>
</template>

<script>
    import MuteSoundButton from './MuteSoundButton'

    export default {
        name: "NavBar",
        data(){
            return{
                activate : false,
                username: ""
            }
        },
        methods: {
            showMenu: function () {
                console.log("hej");
                this.activate = !this.activate;
                console.log(this.activate)
            },
            logout() {
                localStorage.clear();
                this.$store.commit('userStats/setIsLoggedIn', false);
                this.$cookies.remove('userData');
                this.$store.commit("updateWhichPagesThatShouldBeVisibleToTheUser", {
                    loggedInUser: false,
                    admin: false
                })

                this.$router.push("/login")

            },
            searchForUser(username) {
                this.$store.dispatch('userStats/getUser', username)
                    .then((user) => {
                        console.log("in user")
                        console.log(user);
                    })
                    .catch(err => {
                        console.log("User does not exist");
                    })
            },
        },
        components:{
            'mute-sound-button': MuteSoundButton
        },
        computed: {
            displayExclusivePages(){
                return {
                    loggedInUser: this.$store.getters.displayExclusivePages.loggedInUser,
                    loggedInAdmin: this.$store.getters.displayExclusivePages.admin
                }
            }
        },
    }

</script>

<style scoped>
    #topnav{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    #mute{
        grid-column: 3;
    }
     #navBar {
        margin: auto;
        width: 90%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }


    #navBar div {
        padding: 1em;
    }


     #logout-button{
         background: cornflowerblue;
         color: white;
         border-style: none;
         border-radius: 0;
         margin: 0;
         padding: 3px;
         width: auto;
     }
     #logout-button:hover{
         cursor: pointer;
     }

</style>
