<template>
    <div>
        <p>Test!</p>
        <button v-on:click="loadQuestionsFromApi">Load questions from API</button>
        <p>{{this.$store.state.questions}}</p>
    </div>
</template>

<script>
    export default {
        name: "IdaTestComponent",

        methods: {
            //Load questions from the database with the given settings.
            //These can then be accessed from vuex store
            loadQuestionsFromApi(){
                this.$store.dispatch("getQuestions");
            }
        }
    }
</script>

<style scoped>

</style>