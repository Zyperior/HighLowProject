<template>
    <div v-if="fetchedUsers">
        <p v-for="(user, index) in users"><span class="nr">{{index+1}}.</span> {{user.username}} {{user.points}} points</p>
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
<style scoped>
    div{
        text-align: center;
        margin-top: 1em;
        background-color: rgb(251,255,251);
        border: solid rgb(205,226,203);
    }
    .nr{

    }
</style>