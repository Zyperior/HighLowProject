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
            //If input is valid, commit username, email and password to DB. Push router to login-page
            register(){
                this.errorMessage = "";
                if(this.validateInput()){
                    this.$store.dispatch('userDB/register', [this.usernameField, this.passwordField, this.emailField, "USER"])
                        .then((res) => {
                            if(res === 409)
                                this.errorMessage = "This username is already taken";
                            else{
                                this.$router.push('/login')
                            }
                        })
                        .catch((error) => {
                            this.errorMessage = "Something went wrong";
                        })
                }
            },
            //Validate user input. All fields must be entered, passwords must match
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