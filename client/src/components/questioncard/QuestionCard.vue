<template>
    <div class="wrapper">
        <div class="questionGrid">
            <div>Question:</div>
            <div class="questionText"
                 :class="{ smaller : currentQuestion.length > 90}">{{currentQuestion}}
            </div>
        </div>
        <div class="questionFooter">
            <div>Points: {{currentPoints}}</div>
            <slot id="feedback" name="feedback"/>
            <slot id="timer" name="timer"/>
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
        background-color: rgb(251,255,251);;
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

    .questionFooter{
        display: grid;
        grid-template-columns: repeat(3, 33%);
        text-align: start;
        border-top: solid rgb(205,226,203);
    }

    #feedback{
        grid-column: 2;
        font-weight: 800;
        text-align: center;
    }

    #timer{
        grid-column: 3;
        text-align: center;
        white-space: nowrap;
    }



</style>
