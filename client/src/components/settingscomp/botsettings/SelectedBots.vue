<template>
    <div>
        <div class="availableDiv">
        </div>
        <div class="selectViewDiv">
            <select class="box" @change="onChange($event)" size="5" v-model="selectedBotIndex">
                <option v-for="(playingBot, index) in playingBots"
                        :value="index"
                        :title="'Difficulty: ' + playingBot.difficulty + '\nBehavior: ' + playingBot.behavior">
                    {{ playingBot.name }}
                </option>
            </select>
        </div>
    </div>

</template>

<script>
    export default {
        name: "SelectedBots",
        data(){
            return{
                selectedBotIndex:0
            }

        },
        computed: {
            playingBots(){
                return this.$store.getters.playingBots;
            }
        },
        methods: {
            onChange(event){
                this.$emit('setSelectedBotIndex', event.target.value)
            }
        }
    }
</script>

<style scoped>
    p{
        font-size: 13px;
        font-style: italic;
        margin-bottom: 0;
    }

    .box{
        min-width: 9em;
    }
</style>
