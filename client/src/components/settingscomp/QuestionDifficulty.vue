<template>
    <div class="selectDiv">
        <p>Question difficulty:</p>
        <select @change="onChange($event)" v-model="difficulty">
            <option v-for="difficultyOption in difficultyOptions" :value="difficultyOption.value">
                {{ difficultyOption.label }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "QuestionDifficulty",
        data(){
            return{
                difficultyOptions: [
                    {label: "Mixed", value: 0},
                    {label: "Easy", value: 1},
                    {label: "Medium", value: 2},
                    {label: "Hard", value: 3}
                ],
                difficulty: 0
            }
        },
        methods:{
            onChange(event){
                this.$emit('changeDifficulty', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
