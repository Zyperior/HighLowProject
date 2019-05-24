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
        <p>Or use an existing account by entering "user" or "admin" in both fields without quotation marks</p>
        <button class="smallerButton" @click="logout">Logout</button>

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
                successMessage: "",
                failMessage: "",
                displayLogin: true,
            }
        },
        methods: {
            login(){
                this.successMessage = "";
                this.failMessage = "";

                axios.post("http://localhost:5000/users/login", {
                    username: this.usernameField,
                    password: this.passwordField
                    })
                .then((response) => {
                    console.log("response: ", response)
                    this.successMessage = "Logged in successfully";
                    localStorage.setItem("token", response.data.token)
                })
                .catch((error) => {
                    this.failMessage = "Username and password do not match an existing user";
                    console.log(error)
                })
            },
            register(){
                this.successMessage = "";
                this.failMessage = "";

                if(this.validateInput()){
                    axios.post("http://localhost:5000/users/register", {
                        username: this.usernameField,
                        password: this.passwordField
                    })
                    .then(() => {
                        this.displayLogin = true;
                        this.successMessage = "Registration successful, you can now login"
                    })
                    .catch((error) => {
                        this.failMessage = "The username is already taken";
                        console.log(error)
                    })
                }
            },
            logout(){
                localStorage.clear();

                // axios.get("http://localhost:5000/users/logout")
                //     .then(() => {
                //         //localStorage.clear();
                //         //this.$router.push("/")
                //     })
                //     .catch((error) => console.log(error))
            },
            validateInput(){
                //This can easily be filled with more criteria

                if(!this.usernameField || !this.passwordField || !this.repeatPasswordField){
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