<template>
    <div class="selectDiv">
        <p>Number of questions:</p>
        <select @change="onChange($event)" v-model="amount">
            <option v-for="amountOption in questionsAmount" :value="amountOption">
                {{ amountOption }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "NumberOfQuestions",
        data(){
            return{
                questionsAmount: [1, 2, 3, 4, 5],
                amount: 3
            }
        },
        methods:{
            onChange(event){
                this.$emit('changeAmountQuestions', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
