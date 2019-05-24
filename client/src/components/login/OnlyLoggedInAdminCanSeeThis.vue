<template>
    <div>
        <p v-show="viewAdminPages">Only logged in admins can see this!</p>
    </div>
</template>

<script>
    export default {
        name: "OnlyLoggedInAdminCanSeeThis",
        computed: {
            viewAdminPages(){
                return localStorage.viewAdminPages;
            }
        }
    }
</script>

<style scoped>

</style>