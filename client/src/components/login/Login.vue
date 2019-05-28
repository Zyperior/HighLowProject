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
    import axios from "axios" //axios/index

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

                axios.post("http://localhost:5000/users/login", {
                    username: this.usernameField,
                    password: this.passwordField
                    })
                .then((response) => {

                    this.$store.commit('userStats/setIsLoggedIn', true);
                    this.$store.commit('userStats/setUserCookieData', response.data.user)

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("viewAdminPages", response.data.viewAdminPages);

                    this.$store.commit("updateWhichPagesThatShouldBeVisibleToTheUser", {
                        loggedInUser: true,
                        admin: response.data.viewAdminPages
                    });
                    this.$router.push("/profile")
                })
                .catch((error) => {
                    this.errorMessage = "Username and password do not match an existing user";
                    console.log(error)
                })
            },


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