<template>
    <div class="questionFrame">
        <div class="questionText"></div>
        <div class="questionPoints"></div>
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

            }
        }
    }
</script>

<style scoped>

</style>
