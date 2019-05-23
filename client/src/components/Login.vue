<template>
    <div>
        <!--vue router.beforeEach((to, from, next) =>    something like this in vue router? can test if user is admin etc-->

        <div v-show="displayLogin">
            <h1>Login</h1>
            <p class="successMessage">{{successMessage}}</p>
            <p class="failMessage">{{failMessage}}</p>
            <p>Username</p>
            <input v-model="usernameField">
            <br>
            <p>Password</p>
            <input v-model="passwordField" type="password">
            <br>
            <button @click="login">Login</button>
            <p>Don't have an account?</p>
            <button class="smallerButton" @click="displayLogin = false">Sign up</button>
        </div>

        <div v-show="!displayLogin">
            <h1>Sign up</h1>
            <p class="successMessage">{{successMessage}}</p>
            <p class="failMessage">{{failMessage}}</p>
            <p>Username</p>
            <input v-model="usernameField">
            <br>
            <p>Password</p>
            <input v-model="passwordField" type="password">
            <br>
            <button @click="register">Sign up</button>
            <p>Already have an account?</p>
            <button class="smallerButton" @click="displayLogin = true">Login</button>
        </div>

        <br><br><br><br>
        <button class="smallerButton" @click="logout">Logout</button>
        <button @click="testIfLoggedInAndAuthenticated">Magic button</button>

    </div>
</template>

<script>
    import axios from "axios/index"
    axios.defaults.withcredentials = true;


    export default {
        name: "Login",
        data() {
            return {
                usernameField: "",
                passwordField: "",
                successMessage: "",
                failMessage: "",
                displayLogin: true
            }
        },
        methods: {
            login(){
                this.successMessage = "";
                this.failMessage = "";

                axios.post("http://localhost:5000/users/login", {
                    email: this.usernameField,
                    password: this.passwordField
                    })
                .then(() => {
                    //this.$router.push("/")
                })
                .catch((error) => {
                    this.failMessage = `Error: ${error}`
                })
            },
            register(){
                this.successMessage = "";
                this.failMessage = "";

                axios.post("http://localhost:5000/users/register", {
                    email: this.usernameField,
                    password: this.passwordField
                })
                .then((response) => {
                    this.displayLogin = true;
                    this.successMessage = response.data;
                })
                .catch((error) => {
                    this.failMessage = error;
                })
            },
            logout(){
                axios.get("http://localhost:5000/users/logout")
                    .then(() => {
                        this.$router.push("/")
                    })
                    .catch((error) => console.log(error))
            },
            testIfLoggedInAndAuthenticated(){
                axios.get("http://localhost:5000/users/testauth")
                    .then((response) => {
                        console.log(response.data)
                    })
                    .catch((error) => console.log(error))
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
    .successMessage{
        color: green;
        font-weight: bold;

    }
    .failMessage{
        color: red;
        font-weight: bold;
    }

</style>