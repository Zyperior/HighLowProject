<template>
    <div>
        <p>
            {{this.$store.state.questions[questionNumber].question}}
        </p><br>
        <p>
            Highest Answer: {{this.$store.state.highAnswers[0]}} Lowest Answer: {{this.$store.state.lowAnswers[0]}}
        </p>
        
        <input v-model="answer" name='answer' placeholder="Enter your answer">
        <button @click="enterAnswer">Submit answer</button>
    </div>
</template>

<script>
    export default {
        name: 'Game',
        data() {
            return {
                questionNumber: 0,
                answer: ''
            }
        },
        methods: {
            getQuestions() {
                return this.$store.getters.getQuestions;
            },
            enterAnswer: function () {
                if (this.answer < this.$store.state.questions[this.questionNumber].answer) {
                    console.log('This answer is to low');
                    this.$store.state.lowAnswers.push(this.answer);
                    this.$store.state.lowAnswers.reverse();
                    console.log(this.$store.state.lowAnswers);
                }
                if (this.answer > this.$store.state.questions[this.questionNumber].answer) {
                    console.log('This answer is to high')
                    this.$store.state.highAnswers.push(this.answer);
                    this.$store.state.highAnswers.sort();
                    console.log(this.$store.state.highAnswers);
                }
                if (this.answer == this.$store.state.questions[this.questionNumber].answer) {
                    console.log('Answer is correct');
                    this.questionNumber += 1;
                    this.$store.state.highAnswers = [];
                    this.$store.state.lowAnswers = [];
                }
                console.log(this.answer)
                //this.$emit('answerQuestion', newAnswer)
            }
        }
    }
</script>

<style scoped>

</style>