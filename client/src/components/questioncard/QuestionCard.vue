<template>
    <div class="wrapper">
        <div class="questionGrid">
            <div class="questionText">
                {{currentQuestion}}
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
        font-size: 18px;
        border: solid rgb(205,226,203);
        background-color: rgb(251,255,251);;
    }

    .questionText{
        padding: 4px;
    }

    .questionGrid{
        display: grid;
        min-height: 15vh;
        max-height: 15vh;
        text-align: center;
        padding: 2px;
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
