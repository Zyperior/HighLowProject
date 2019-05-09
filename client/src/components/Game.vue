<template>
    <div id="gameContainer">
        <header id="header">
            TEMP BEFORE ROUTING WORKS
        </header>
        <p id="question">
            <!--{{this.$store.state.questions[questionNumber].question}}-->
        </p>
        <p id="hiTracker">
            <!--Highest Answer: {{this.$store.state.highAnswers[0]}}-->
        </p>
        <p id="loTracker">
            <!--Lowest Answer: {{this.$store.state.lowAnswers[0]}}-->
        </p>

        <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')" name='answer' placeholder="Enter your answer" id="answer">
        <button @click="enterAnswer" id="submit">Submit answer</button>
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
                    this.$store.state.answers.push(this.answer);
                    this.$store.state.lowAnswers.reverse();
                    console.log(this.$store.state.lowAnswers);
                }
                if (this.answer > this.$store.state.questions[this.questionNumber].answer) {
                    console.log('This answer is to high');
                    this.$store.state.highAnswers.push(this.answer);
                    this.$store.state.answers.push(this.answer);
                    this.$store.state.highAnswers.sort();
                    console.log(this.$store.state.highAnswers);
                }
                if (this.answer == this.$store.state.questions[this.questionNumber].answer) {
                    console.log('Answer is correct');
                    this.$store.state.answers.push(this.answer);
                    console.log(this.$store.state.answers);
                    this.questionNumber += 1;
                    this.$store.state.highAnswers = [];
                    this.$store.state.lowAnswers = [];
                }
                this.answer = '';
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 900px) {
        #gameContainer {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(5, 1fr);
            background-color: aqua
        }

        #header {
            background-color: gray;
            grid-column: 1 / span 6;
            grid-row: 1;
            text-align: center;
        }

        #question {
            grid-row: 2;
            grid-column: 3 / span 2;
            border: solid black 1px;
        }

        #answer {
            grid-row: 4;
            grid-column: 3 / span 2;
        }

        #submit {
            grid-row: 5;
            grid-column: 3 / span 2;

        }

        #hiTracker {
            grid-row: 3;
            grid-column: 3;
            border: solid black 1px;
        }

        #loTracker {
            grid-row: 3;
            grid-column: 4;
            border: solid black 1px;
        }
    }

    @media only screen and (max-width: 899px) {
        #gameContainer {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
            background-color: aqua
        }

        #header {
            background-color: gray;
            grid-column: 1 / span 4;
            grid-row: 1;
            text-align: center;
        }

        #question {
            grid-row: 2;
            grid-column: 2 / span 2;
            border: solid black 1px;
        }

        #answer {
            grid-row: 4;
            grid-column: 2 / span 2;
        }

        #submit {
            grid-row: 5;
            grid-column: 2 / span 2;

        }

        #hiTracker {
            grid-row: 3;
            grid-column: 2;
            border: solid black 1px;
        }

        #loTracker {
            grid-row: 3;
            grid-column: 3;
            border: solid black 1px;
        }
    }
</style>