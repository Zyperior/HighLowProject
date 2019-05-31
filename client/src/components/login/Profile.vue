<template>
    <div id="profile">
        <img src="../../assets/avatar.svg" alt="profile-picture">
        <h1 v-if="isLoggedIn">Welcome, {{user.username}}</h1>
        <h1 v-else>{{user.username}}</h1>
        <div class="statistics">
            <h3>Points:</h3> <p>{{user.points}}</p>
            <h3>Correct answers percentage:</h3> <p>{{percentage}}%</p>
            <h3>Games played:</h3> <p>{{user.gamesplayed}}</p>
            <h3>Total guesses:</h3> <p>{{user.totalguesses}}</p>
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
    @media(max-width: 415px){
        img {
            width: 50%;
            height: 50%;
            border: solid rgb(205,226,203);
        }
        h4{
            display: inline-block;
        }
        .statistics {
            margin: 1em;
            padding: 2em 1em 3em 1em;
            display: inline-block;
            border: solid rgb(205,226,203);
            background-color: rgb(251,255,251);
        }
    }

</style>