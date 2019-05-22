<template>
    <div>
        <p>Basic login authentication test. Only logged in users can access the backend endpoint the button leads to.</p>
        <button @click="testIfLoggedInAndAuthenticated">Magic button</button>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "OnlyAuthorizedCanSeeThis",
        methods: {
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

</style>