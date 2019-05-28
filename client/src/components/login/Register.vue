<template>
    <div>

        <h1>Sign up</h1>
        <p class="errorMessage">{{errorMessage}}</p>

        <p>Username</p>
        <input v-model="usernameField">
        <p>Email</p>
        <input v-model="emailField"/>
        <p>Password</p>
        <input v-model="passwordField" type="password">
        <p>Repeat password</p>
        <input v-model="repeatPasswordField" type="password">

        <br><br>
        <button @click="register">Sign up</button>
        <p>Already have an account?</p>
        <button class="smallerButton" @click="$router.push('/login')">Login</button>


    </div>
</template>

<script>
    import axios from "axios"


    export default {
        name: "Register",
        data(){
            return {
                usernameField: "",
                passwordField: "",
                repeatPasswordField: "",
                emailField: "",

                errorMessage: ""
            }
        },
        methods: {
            register(){
                this.errorMessage = "";

                if(this.validateInput()){
                    axios.post("http://localhost:5000/users/register", {
                        username: this.usernameField,
                        password: this.passwordField,
                        email: this.emailField,
                        role: "USER"
                    })
                        .then((res) => {
                            this.$router.push('/login')
                        })
                        .catch((error) => {
                            this.errorMessage = "The username is already taken";
                            console.log(error)
                        })
                }
            },

            validateInput(){

                if(!this.usernameField || !this.passwordField || !this.repeatPasswordField || !this.emailField){
                    this.errorMessage = "All fields must be entered"
                }

                if(this.passwordField !== this.repeatPasswordField) {
                    this.errorMessage = "Password fields do not match";
                }

                return this.errorMessage === "";
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
</style>