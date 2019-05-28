<template>
    <div>


        <div id="navigation-bar">

            <div id="left-container">
                <input id="search-field" v-model="username" placeholder="Search for user">
                <img id="glass-icon" src="/soundfx/Magnifying_glass_icon.svg" @click="searchForUser(username)" />
            </div>





            <div id="right-container">
                <!--<div>-->
                    <!--<mute-sound-button id="sound-icon"/>-->
                <!--</div>-->

                <button>Login</button>
                <button>Register</button>


                <img @click="showMenu" id="menu-icon" src="../../public/menu.png">
                <!--<div>-->
                    <!--&lt;!&ndash;<a class="menu-icon" href="javascript:void(0);" @click="showMenu"><i class="fa fa-bars"></i></a>&ndash;&gt;-->
                <!--</div>-->
            </div>

        </div>


        <div id="links" v-if="activate === true">
<!--            <div @click="showMenu"> </div>-->
            <div @click="showMenu"><router-link to="/">Home</router-link></div>
            <div @click="showMenu"><router-link to="/rules">Rules</router-link></div>
            <div @click="showMenu"><router-link to="/about">About</router-link></div>
            <div @click="showMenu"><router-link to="/bots">Bots</router-link></div>
            <div @click="showMenu"><router-link to="/settings">Settings</router-link></div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/profile">Profile</router-link>
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
                        console.log("in user");
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

    #navigation-bar{
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        height: 3em;
        background: #393939;


    }

    #left-container, #right-container{
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 1em;
        margin-right: 1em;
        align-items: center;
    }

    #right-container button{
        border: none;
        background: #83cd62;
        color: white;
        border-radius: 5px;
        padding: 0.5em 1em;
        margin-left: 1em;
    }

    #right-container button:hover, #menu-icon:hover, #glass-icon, #links{
        cursor: pointer;
    }

    #search-field{
        margin-right: 1em;
    }

    #left-container img{
        max-height: 1em;
    }

    #menu-icon{
        color: white;
        height: 50px;
        margin-left: 1em;
    }



    #links{
        background: gray;
        width: 10em;
        position: fixed;
        right: 0;
        margin-left: auto;
    }
    #links > div{
        padding: 0.5em;
    }
    #links a{
        color: white;
        text-decoration: none;
        display: block;
    }
    #links > div:hover{
        background: #555555;
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
