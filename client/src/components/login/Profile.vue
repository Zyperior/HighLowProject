<template>
    <div id="profile">
        <img src="../../assets/avatar.svg" alt="profile-picture">
        <div class="user-info">
            <h1 v-if="isLoggedIn">Welcome, {{user.username}}</h1>
            <h1 v-else>{{user.username}}</h1>

            <div class="statistics">
                <h3>Points:</h3> <p>{{user.points}}</p>
                <h3>Correct answers percentage:</h3> <p>{{percentage}}%</p>
                <h3>Games played:</h3> <p>{{user.gamesplayed}}</p>
                <h3>Total guesses:</h3> <p>{{user.totalguesses}}</p>
            </div>
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
            isLoggedIn(){  //If user is logged in and the prop 'user' username matches logged in user
                return this.$cookies.isKey('userData') && this.$cookies.get('userData').username === this.user.username
            }
        }


    }

</script>

<style scoped>
    img, .statistics {
        border: solid rgb(205,226,203);
    }
    img {
        width: 15%;
        height: 15%;
        display: inline-block;
    }

    h4{
        display: inline-block;
    }
    h1{
        margin-bottom: 0.5em;
    }
    .statistics {
        padding: 2em 1em 0em 1em;
        display: inline-block;
        background-color: rgb(251,255,251);
    }
    .user-info{
        display: block;
        margin-top: 2em;
    }
    @media(max-width: 415px){
        img {
            width: 50%;
            height: 50%;
            margin: 0;
        }
        .statistics {
            margin: 1em;
            padding: 2em 1em 1em 1em;
            display: inline-block;
            border: solid rgb(205,226,203);
            background-color: rgb(251,255,251);
        }
        h1{
            margin-bottom: 0;
            margin-top: 0;
        }
    }

</style>