<template>
    <div>


        <div id="navigation-bar">

            <div id="left-container">
                <input id="search-field" v-model="username" placeholder="Search for user">
                <img id="glass-icon" src="/soundfx/Magnifying_glass_icon.svg" @click="searchForUser(username)" />
            </div>





            <div id="right-container">
                <mute-sound-button id="sound-icon"/>

                <button v-show="!displayExclusivePages.loggedInUser" @click="$router.push('/login')">Login</button>
                <!--<button v-show="!displayExclusivePages.loggedInUser" @click="$router.push('/register')">Register</button>-->
                <button v-show="displayExclusivePages.loggedInUser" @click="logout">Logout</button>


                <img @click="showMenu" id="menu-icon" src="../../public/menu.png">
                <!--<div>-->
                    <!--&lt;!&ndash;<a class="menu-icon" href="javascript:void(0);" @click="showMenu"><i class="fa fa-bars"></i></a>&ndash;&gt;-->
                <!--</div>-->
            </div>

        </div>


        <div id="links" v-if="activate === true">
<!--            <div @click="showMenu"> </div>-->
            <div @click="showMenu"><router-link to="/">Play</router-link></div>
            <div @click="showMenu"><router-link to="/rules">Rules</router-link></div>
            <div @click="showMenu"><router-link to="/about">About</router-link></div>
            <div @click="showMenu"><router-link to="/bots">Bots</router-link></div>
            <div @click="showMenu"><router-link to="/settings">Settings</router-link></div>

            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/myprofile">Profile</router-link>
            </div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInUser">
                <router-link to="/suggest-question">Suggest a question</router-link>
            </div>
            <div @click="showMenu" v-show="displayExclusivePages.loggedInAdmin">
                <router-link to="/admin">Admin page</router-link>
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
                this.activate = !this.activate;
            },
            logout() {
                localStorage.clear();
                this.$store.commit('userDB/setIsLoggedIn', false);
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
        width: 9em;
    }

    #left-container img{
        max-height: 1em;
    }

    #menu-icon{
        color: white;
        height: 40px;
        margin-left: 1em;
    }

    button{
        outline: none;
    }



    #links{
        background: gray;
        opacity: 0.9;
        width: 10em;
        position: fixed;
        right: 0;
        margin-left: auto;
        text-align: left;
        z-index: 1;
    }
    #links > div{
        padding: 0.3em;
    }
    #links a{
        color: white;
        text-decoration: none;
        display: block;
    }
    #links > div:hover{
        background: #555555;
    }


    #sound-icon{
        margin-top: 3px;
    }

</style>
