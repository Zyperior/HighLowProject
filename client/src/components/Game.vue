<template>
    <div>
        <p>
            {{this.$store.state.questions[questionNumber].question}}
        </p>
        <input type="text" name="" placeholder="Enter your answer">
    </div>
</template>

<script>
    export default {
        name: 'Game',
        data(){
            return {
                questionNumber: 1
            }
        },
        methods: {
            getQuestions() {
                return this.$store.getters.getQuestions;
            },
            nextQuestion: function(){
                if(playerinput.answer === this.$store.state.questions[questionNumber].answer){
                    questionNumber += 1;
                }
            },
        }

    }
</script>

<style scoped>

</style>