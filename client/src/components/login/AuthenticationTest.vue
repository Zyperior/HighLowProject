<template>
    <div>
        <p>Temporary test component.</p>
        <p>Click on the buttons to check your current authorization levels. They return an answer if the request to the backend was accepted or not.</p>

        <button @click="button1">Logged in users (including admins) can make this request</button>
        <p>{{message1}}</p>
        <br><br><br><br><br>
        <button @click="button2">Logged in admins can make this request</button>
        <p>{{message2}}</p>


    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "AuthenticationTest",
        data(){
            return {
                message1: "",
                message2: ""
            }
        },
        methods: {
            button1(){
                axios.get("http://localhost:5000/users/auth-test-logged-in", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    this.message1 = "Request accepted. You are logged in as a user or admin"
                })
                .catch(() => {
                    this.message1 = "Request failed. You are not logged in"
                })

            },
            button2(){
                axios.get("http://localhost:5000/users/auth-test-logged-in-admin", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    this.message2 = "Request accepted. You are logged in as an admin"
                })
                .catch(() => {
                    this.message2 = "Request failed. You are either not logged in or logged in but not as an admin"
                })
            }
        }
    }
</script>

<style scoped>

</style>