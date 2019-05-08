<template>
    <div>
        <p>
            This is the game page
        </p>
        <input type="text" name="" placeholder="Enter your answer">
    </div>
</template>

<script>
    export default {
        name: 'Game',
        
        methods: {
            getQuestions() {
                return this.$store.getters.getQuestions
            }
        }

    }
</script>

<style scoped>

</style>