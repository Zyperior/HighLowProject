<template>
    <div v-if="fetchedUsers">
        Top players:
        <p v-for="(user, index) in users">{{index+1}}. {{user.username}} {{user.points}} points</p>
    </div>
    <div v-else>
        <h3>Failed to fetch top users</h3>
    </div>
</template>
<script>
    export default {
        name: 'top-users',
        data() {
            return {
                users: [],
                fetchedUsers: true
            }
        },
        computed: {

        },
        created(){
            this.$store.dispatch('userDB/getTopUsers', 10)
                .then(users => this.users = users)
                .catch(err => this.fetchedUsers = false)
        }
    }
</script>
<style>

</style>