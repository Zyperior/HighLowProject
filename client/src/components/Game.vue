<template>
    <div>
        <div v-for="question in getActiveQuestion" :key="question.question">
            <p>{{question.question}}</p>
        </div>
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
            }
        },
        computed: {
           getActiveQuestion() {
               return this.$store.commit('getActiveQuestion');
           }
        }

    }
</script>

<style scoped>

</style>