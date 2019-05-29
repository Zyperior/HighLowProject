<template>
    <div>
        <div class="statistics">
            <h1 v-if="isLoggedIn">Welcome, {{user.username}}</h1>
            <h1 v-else>{{user.username}}</h1>
            <h4>Points:</h4> {{user.points}}<br>
            <h4>Correct answers percentage:</h4> {{percentage}}%<br>
            <h4>Games played:</h4> {{user.gamesplayed}}<br>
            <h4>Total guesses:</h4> {{user.totalguesses}}
        </div>
    </div>
</template>

<script>


    export default {
        name: "Profile",
        props: {
            user: {
                required: false,
                type: Object
            }
        },
        computed: {
            percentage(){
                if(this.user.totalguesses != 0)
                    return Math.floor(this.user.correctguesses / this.user.totalguesses * 100);
                else
                    return 0;
            },
            isLoggedIn(){
                return this.$cookies.isKey('userData') && this.$cookies.get('userData').username === this.user.username
            }
        }


    }

</script>

<style scoped>
 h4{
     display: inline-block;
 }
    .statistics {
        display: inline-block;
        border: 1px solid black;
        background-color: lightgoldenrodyellow;
    }
</style>