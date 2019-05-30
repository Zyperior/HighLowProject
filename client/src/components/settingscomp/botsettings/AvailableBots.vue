<template>
    <div>
        <div class="availableDiv">
        </div>
        <p>Available bots</p>
        <div class="selectViewDiv" id="lastSelect">
            <select @change="onChange($event)" size="5" v-model="availableBotIndex">
                <option v-for="(availableBot, index) in availableBots"
                        :value="index"
                        :title="'Difficulty: ' + availableBot.difficulty + '\nBehavior: ' + availableBot.behavior">
                    {{ availableBot.name }}
                </option>
            </select>
        </div>
    </div>

</template>

<script>
    export default {
        name: "AvailableBots",
        data(){
            return{
                availableBotIndex:0
            }
        },
        computed: {
            availableBots(){
                return this.$store.getters.availableBots;
            },
        },
        methods:{
            onChange(event){
                this.$emit('changeAvailableBotIndex', event.target.value)
            }
        }
    }
</script>

<style scoped>
p{
    font-size: 13px;
    font-style: italic;
}
</style>
