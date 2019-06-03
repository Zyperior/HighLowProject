<template>
    <div>

        <h1>Login</h1>
        <p class="errorMessage">{{errorMessage}}</p>

        <p>Username</p>
        <input v-model="usernameField">
        <p>Password</p>
        <input v-model="passwordField" type="password">

        <br><br>
        <button @click="login">Login</button>
        <p>Don't have an account?</p>
        <button class="smallerButton" @click="$router.push('/register')">Sign up</button>


        <br><br><hr><br><br>
        <div id="info">
            <p>Or test with an existing account:</p>
            <br>
            <p>username: <span>user</span>, password: <span>user</span></p>
            <p>username: <span>admin</span>, password: <span>admin</span></p>
        </div>



    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                usernameField: "",
                passwordField: "",

                errorMessage: ""
            }
        },
        methods: {
            login(){
                this.errorMessage = "";

                this.$store.dispatch('userDB/login', [this.usernameField, this.passwordField])
                .then((response) => {

                    this.$store.commit('userDB/setUserCookieData', response.user);
                    this.$store.commit('userDB/setIsLoggedIn', true);

                    localStorage.setItem("token", response.token);
                    localStorage.setItem("viewAdminPages", response.viewAdminPages);

                    this.$store.commit("updateWhichPagesThatShouldBeVisibleToTheUser", {
                        loggedInUser: true,
                        admin: response.viewAdminPages
                    });

                    this.$router.push("/profile/"+response.user.username);
                })
                .catch(() => {
                    this.errorMessage = "Username and password do not match an existing user";
                })
            }


        }
    }
</script>

<style scoped>
    .smallerButton{
        background: none;
        text-decoration: underline;
        border-style: none;
        margin: 0;
        padding: 0;
        width: auto;
    }
    .smallerButton:hover{
        cursor: pointer;
    }
    .errorMessage{
        color: red;
        font-weight: bold;
    }


    #info p{
        padding: 0;
    }
    span{
        font-weight: bold;
    }



</style>