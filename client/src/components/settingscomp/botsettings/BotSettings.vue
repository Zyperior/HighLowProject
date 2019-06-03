<template>
   <div class="botContainer">
       <p id="selectedBotsText">Selected bots</p>
       <p id="availaBotsText">Available bots</p>
       <selected-bots id="selectedBots" @setSelectedBotIndex="setSelectedBotIndex" />
       <add-remove-button id="addButton" directive="add" @addAvailableToPlaying="addAvailableToPlaying" />
       <add-remove-button id="removeButton" directive="remove" @addPlayingToAvailable="addPlayingToAvailable"/>
       <available-bots id="availableBots" @changeAvailableBotIndex="setAvailableBotIndex" />

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

        }


    }
</script>

<style scoped><style scoped>
    .botContainer{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        justify-items: center;

    }
    #selectedBotsText{
        grid-row: 1;
        grid-column: 1;
        font-size: 14px;
    }
    #availaBotsText{
        grid-row: 1;
        grid-column: 3;
        font-size: 14px;

    }
    #selectedBots{
        grid-column: 1;
        grid-row: 2 / span 3;
    }
    #availableBots{
        grid-column: 3;
        grid-row: 2 / span 3;

    }
    #addButton{
        grid-column: 2;
        grid-row: 2;
        justify-self: center;
    }
    #removeButton{
        grid-column: 2;
        grid-row: 3;
        justify-self: center;
    }
    @media only screen and (min-width: 900px) {
        .botContainer{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            justify-items: center;
        }

        #selectedBotsText{
            grid-row: 1;
            grid-column: 1;
            font-size: 14px;
            justify-self: start;
        }

        #availaBotsText{
            grid-row: 1;
            grid-column: 2 / span 3;
            font-size: 14px;
            padding-left: 3.5em;
        }

        #selectedBots{
            grid-column: 1;
            grid-row: 2 / span 3;
            justify-self: start;
            padding-left: 14px;

        }

        #availableBots{
            grid-column: 2 / span 3;
            grid-row: 2 / span 3;
            padding-left: 2.8em;
        }

        #addButton{
            grid-column: 1 / span 2;
            grid-row: 2;
            justify-self: center;
            padding-left: 4.5em;
        }

        #removeButton{
            grid-column: 1 / span 2;
            grid-row: 3;
            justify-self: center;
            padding-left: 4.5em;
        }
    }

</style>

</style>
