<template>
   <div>
       <selected-bots @setSelectedBotIndex="setSelectedBotIndex" />
       <add-remove-button directive="add" @addAvailableToPlaying="addAvailableToPlaying" />
       <add-remove-button directive="remove" @addPlayingToAvailable="addPlayingToAvailable"/>
       <available-bots @changeAvailableBotIndex="setAvailableBotIndex" />
       <bot-commentary @botComment="setBotComment"/>
   </div>
</template>

<script>
    import SelectedBots from './SelectedBots'
    import AddRemoveBotButton from './AddRemoveBotButton'
    import AvailableBots from './AvailableBots'
    import ChattyBots from './ChattyBots'

    export default {
        name: "BotSettings",
        components: {
            'selected-bots': SelectedBots,
            'add-remove-button': AddRemoveBotButton,
            'available-bots': AvailableBots,
            'bot-commentary': ChattyBots
        },
        data() {
            return {
                selectedIndex: 0,
                availableIndex: 0
            }
        },
        computed: {
            availableBots() {
                return this.$store.getters.availableBots;
            },
            playingBots() {
                return this.$store.getters.playingBots;
            }
        },
        methods: {
            setSelectedBotIndex(value) {
                this.selectedIndex = value;
            },
            setAvailableBotIndex(value) {
                this.availableIndex = value;
            },
            addAvailableToPlaying() {
                if(typeof this.availableBots[this.availableIndex] !== "undefined"
                    && this.playingBots.length < 5){

                    this.availableBots[this.availableIndex].isPlaying = true;
                }
            },
            addPlayingToAvailable() {
                if(typeof this.playingBots[this.selectedIndex] !== "undefined"
                    && this.playingBots.length > 1){

                    this.playingBots[this.selectedIndex].isPlaying = false;
                }

            },
            setBotComment(value) {
                this.$emit('botComment', value)
            }
        }


    }
</script>

<style scoped>

</style>
