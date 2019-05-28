<template>
    <div class="wrapper">
        <div class="questionGrid">
            <div>Question:</div>
            <div class="questionText"
                 :class="{ smaller : currentQuestion.length > 90}">{{currentQuestion}}
            </div>
        </div>
        <div class="pointsGrid">
            <div>Points:</div>
            <div>{{currentPoints}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "questionCard",
        computed:{
            currentQuestion() {
                return this.$store.getters.getCurrentQuestion;
            },
            currentPoints(){
                return this.$store.getters.getCurrentQuestionValue;
            }
        }
    }
</script>

<style scoped>

    .wrapper{
        display: grid;
        font-size: 15px;
        border: solid rgb(205,226,203);
    }

    .questionGrid{
        display: grid;
        grid-template-columns: 75px auto;
        min-height: 10vh;
        text-align: start;
    }

    .smaller{
        font-size: 14px;
    }

    .pointsGrid{
        display: grid;
        grid-template-columns: 75px auto;
        text-align: start;
        border-top: solid rgb(205,226,203);
    }

</style>
