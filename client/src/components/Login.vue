<template>
    <div>

        <div v-show="displayLogin">
            <h1>Login</h1>
            <p>Username</p>
            <input v-model="usernameField">
            <br>
            <p>Password</p>
            <input v-model="passwordField">
            <br>
            <button @click="login">Login</button>
            <p>Don't have an account?</p>
            <button class="smallerButton" @click="displayLogin = false">Sign up</button>
        </div>

        <div v-show="!displayLogin">
            <h1>Sign up</h1>
            <p>Username</p>
            <input v-model="usernameField">
            <br>
            <p>Password</p>
            <input v-model="passwordField">
            <br>
            <button @click="register">Sign up</button>
            <p>Already have an account?</p>
            <button class="smallerButton" @click="displayLogin = true">Login</button>
        </div>

    </div>
</template>

<script>
    import axios from "axios/index"

    export default {
        name: "Login",
        data() {
            return {
                displayLogin: true,
                usernameField: "",
                passwordField: ""
            }
        },
        methods: {
            login(){
                //console.log("clicked login", this.usernameField, this.passwordField)
                axios.post("`http://localhost:5000/users/login", {
                    email: this.usernameField,
                    password: this.passwordField
                })
            },
            register(){
                //console.log("clicked login", this.usernameField, this.passwordField)
                axios.post("`http://localhost:5000/users/register", {
                    email: this.usernameField,
                    password: this.passwordField
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
</style>