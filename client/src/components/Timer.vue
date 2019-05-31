<template>
    <div>
        Time: {{ timeLeft }}s
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

</style>
