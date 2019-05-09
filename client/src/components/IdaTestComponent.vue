<template>
    <div>
        <p>Test!</p>
        <button v-on:click="loadQuestionsFromApi">Load questions from API</button>
        <p>{{this.$store.state.questions2}}</p>
    </div>
</template>

<script>
    export default {
        name: "IdaTestComponent",

        methods: {

            loadQuestionsFromApi(){
                this.$store.dispatch("getQuestions2");
            }
        }
    }
</script>

<style scoped>

</style>