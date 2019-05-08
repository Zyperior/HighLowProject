<template>
    <div>
        <p>

        </p>
        <input type="text" name="" placeholder="Enter your answer">
    </div>
</template>

<script>
    export default {
        name: 'game',
        components,
        methods: {
            getQuestions() {
                return this.$store.getters.getQuestions
            }
        }

    }
</script>

<style scoped>

</style>