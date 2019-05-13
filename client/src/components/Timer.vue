<template>
    <div>
        <p>Time left: {{ timeLeft }}s</p>
        
        <p v-show="timeIsUp">Time's up!</p>

    </div>
</template>

<script>
export default {

    // data: function () {
         
    //     return {
    //         time: 3000,
    //         interval: 0
    //     }

    // },

    methods: {

        startTimer: function() {

            this.$store.commit("startTimer");

        },


        stopTimer: function() {

            this.$store.commit("stopTimer");

        }

    },


    computed: {

        timeLeft() {

            return this.$store.getters.getTimeLeft;

        },

        timeIsUp() {

            return this.$store.getters.getTimeIsUp;

        }
    
    }
    
}
</script>

<style scoped>

</style>
