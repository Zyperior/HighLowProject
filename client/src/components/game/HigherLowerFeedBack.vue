<template>
    <div>{{higherLower}}</div>
</template>

<script>
    export default {
        name: "HigherLowerFeedBack",
        computed: {
            higherLower() {
                if (this.lastGuess === -1) {
                    return "Too slow!"
                } else if (this.lastGuess === this.correctAnswer) {
                    return "Correct! "+this.correctAnswer;
                } else if (this.lastGuess > this.correctAnswer) {
                    return "Lower!"
                } else if (this.lastGuess < this.correctAnswer) {
                    return "Higher!"
                }
            },
            lastGuess(){
                return this.$store.getters.getLastGuess;
            },
            correctAnswer(){
                return this.$store.getters.getCorrectAnswer;
            }
        }
    }
</script>

<style scoped>
    div{
        display:block;
    }
</style>