<template>
    <div>
        <!-- <button @click="startTimer">Start the timer</button> -->

        <p>Time left: {{ timeLeft }}s</p>
        
        <p v-show="timeIsUp">Time's up!</p>

    </div>
</template>

<script>
export default {

    data: function () {
         
        return {
            time: 3000,
            interval: 0
        }

    },

    methods: {

        startTimer: function() {

            var vm = this;

            vm.$data.interval = setInterval(function() {

                vm.$data.time -= 100;

                if (vm.$data.time === 0) {

                    clearInterval(vm.$data.interval);

                }

            }, 100);

        },


        stopTimer: function() {

            clearInterval(this.$data.interval);

        }

    },


    computed: {

        timeLeft() {

            return (this.time / 1000).toFixed(1);

        },

        timeIsUp() {

            return this.time === 0;

        }
    
    }
    
}
</script>

<style scoped>

</style>
