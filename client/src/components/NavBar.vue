<template>
    <div id="topnav">
        <div class="searchPlaceHolder">
            <input id="searchInput" v-model="username" placeholder="Search for user"><img id="glass" src="/soundfx/Magnifying_glass_icon.svg" @click="searchForUser(username)"/>
        </div>
        <div id="myLinks" v-if="activate === true">
            <div @click="showMenu"> </div>
            <div @click="showMenu"><router-link to="/">Home</router-link></div>
            <div @click="showMenu"><router-link to="/rules">Rules</router-link></div>
            <div @click="showMenu"><router-link to="/about">About</router-link></div>
            <div @click="showMenu"><router-link to="/bots">Bots</router-link></div>
            <div @click="showMenu"><router-link to="/settings">Settings</router-link></div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to='/myprofile'>Profile</router-link>
            </div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/suggest-question">Suggest a question</router-link>
            </div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInAdmin">
                <router-link to="/admin">Admin page</router-link>
            </div>

            <div @click="showMenu" v-show="!displayExclusivePages.loggedInUser">
                <router-link to="/login">Login</router-link>
            </div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <button id="logout-button" @click="logout">Logout button</button>
            </div>

        </div>
            <a href="javascript:void(0);" class="icon" @click="showMenu">
            <i class="fa fa-bars"></i>
        </a>

        <mute-sound-button id="mute" />

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
                this.activate = !this.activate;
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
                if(username != "")
                    this.$router.push({name: 'user-profile', params: {username: username}});
            }
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
    .searchPlaceHolder{
        display: grid;
        grid-template-columns: repeat(2, auto);
    }
    #topnav{
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        padding: 3px 3px 3px 3px;
    }
    #mute{
        grid-column: 3;
    }
    #glass{
        grid-column: 2;
        height: 22px;
        width: 22px;
    }
    #searchInput{
        grid-column: 1;
        max-height: 20px;
        max-width: 90px;

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
