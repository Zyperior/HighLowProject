<template>
    <div class="selectDiv">
        <p>Extra players:</p>
        <select @change="onChange($event)" v-model="amount">
            <option v-for="players in playersAmount" :value="players">
                {{ players }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "NumberOfPlayers",
        data(){
            return{
                playersAmount: [0, 1, 2, 3, 4, 5, 6],
                amount: 0
            }
        },
        methods:{
            onChange(event){
                this.$emit('changePlayerAmount', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
