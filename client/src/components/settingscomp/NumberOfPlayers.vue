<template>
    <div class="selectDiv">
        <select @change="onChange($event)" v-model="amount">
            <option v-for="players in playersAmount" :value="players">
                {{ players }}
            </option>
        </select>
    </div>
</template>

<script>
    import {getCurrentSettings} from '../../modules/settingsData'

    export default {
        name: "NumberOfPlayers",
        data(){
            return{
                playersAmount: [0, 1, 2, 3, 4, 5, 6],
                amount: getCurrentSettings().playerAmount
            }
        },
        methods:{
            onChange(event){
                this.$emit('changePlayerAmount', parseInt(event.target.value))
            }
        }
    }
</script>

<style scoped>

</style>
