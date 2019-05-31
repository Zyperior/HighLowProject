<template>
    <div class="timerWrapper">
        <div id="timerDescription"> Time: </div> <div id="timeLeft">{{ timeLeft }}</div>
    </div>
</template>

<script>
export default {

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
    }

}
</script>

<style scoped>
.timerWrapper {
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

#timerDescription {
    grid-column: 1;
}

#timeLeft {
    grid-column: 2;
    text-align: left;
}


</style>
