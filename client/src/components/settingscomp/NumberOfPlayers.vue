<template>
    <div class="selectDiv">
        <p>Number of players:</p>
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
                playersAmount: [1, 2, 3, 4, 5, 6],
                amount: 1
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
