<template>
    <div>

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
            <button class="smallerButton" @click="displayLogin = false; failMessage=''; successMessage='';">Sign up</button>
        </div>

        <div v-show="!displayLogin">
            <h1>Sign up</h1>
            <p class="successMessage">{{successMessage}}</p>
            <p class="failMessage">{{failMessage}}</p>
            <p>Username</p>
            <input v-model="usernameField">
            <br>
            <p>Email</p>
            <input v-model="emailField"/>
            <br>
            <p>Password</p>
            <input v-model="passwordField" type="password">
            <br>
            <p>Repeat password</p>
            <input v-model="repeatPasswordField" type="password">
            <br>
            <button @click="register">Sign up</button>
            <p>Already have an account?</p>
            <button class="smallerButton" @click="displayLogin = true; failMessage=''; successMessage='';">Login</button>
        </div>

        <br><br><br><br>

    </div>
</template>

<script>
    import axios from "axios/index"

    export default {
        name: "Login",
        data() {
            return {
                usernameField: "",
                passwordField: "",
                repeatPasswordField: "",
                emailField: "",
                successMessage: "",
                failMessage: "",
                displayLogin: true

            }
        },
        methods: {
            login(){
                this.successMessage = "";
                this.failMessage = "";

                this.$store.dispatch('userDB/login', [this.usernameField, this.passwordField])
                .then((response) => {

                    this.$store.commit('userDB/setUserCookieData', response.user)
                    this.$store.commit('userDB/setIsLoggedIn', true);

                    localStorage.setItem("token", response.token);
                    localStorage.setItem("viewAdminPages", response.viewAdminPages);

                    this.$store.commit("updateWhichPagesThatShouldBeVisibleToTheUser", {
                        loggedInUser: true,
                        admin: response.viewAdminPages
                    });

                    this.$router.push("/profile/"+response.user.username);
                })
                .catch((error) => {
                    this.failMessage = "Username and password do not match an existing user";
                })
            },
            register(){
                this.successMessage = "";
                this.failMessage = "";

                if(this.validateInput()){
                    this.$store.dispatch('userDB/register', [this.usernameField, this.passwordField, this.emailField, "USER"])
                    .then((res) => {
                        this.displayLogin = true;
                        this.successMessage = "Registration successful, you can now login"
                    })
                    .catch((error) => {
                        this.failMessage = "The username is already taken";
                    })
                }
            },

            validateInput(){
                //This can easily be filled with more criteria

                if(!this.usernameField || !this.passwordField || !this.repeatPasswordField || !this.emailField){
                    this.failMessage = "All fields must be entered"
                }

                if(this.passwordField !== this.repeatPasswordField) {
                    this.failMessage = "Password fields do not match";
                }

                return this.failMessage === "";
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