<template>
    <div class="selectDiv">
        <select @change="onChange($event)" v-model="amount">
            <option v-for="amountOption in questionsAmount" :value="amountOption">
                {{ amountOption }}
            </option>
        </select>
    </div>
</template>

<script>
    import {getCurrentSettings} from '../../modules/settingsData'

    export default {
        name: "NumberOfQuestions",
        data(){
            return{
                questionsAmount: [1, 2, 3, 4, 5],
                amount: getCurrentSettings().questions.amount
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
