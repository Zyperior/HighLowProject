<template>
    <div>
        <h1>Welcome {{user.username}}</h1>
        <div class="statistics">
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
                required: true,
                type: Object
            }
        },
        computed: {
            percentage(){
                if(this.user.totalguesses != 0)
                    return Math.floor(this.user.correctguesses / this.user.totalguesses * 100);
                else
                    return 0;
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