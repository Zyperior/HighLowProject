<template>
    <div>
        <button @click="startTimer">Start the timer</button>

        <p>Time left: {{ timeLeft }}s</p>
        
        <p v-show="timeIsUp">Time's up!</p>

    </div>
</template>

<script>
export default {

    methods: {

        startTimer: function() {



        }

    }
    
}
</script>