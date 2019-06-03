<template>

    <div id="card-div" v-if="getPlayerIndexes.length > 0">

        <div id="hidden" :class="{hiddenCard: flipCardsOngoing}" v-if="activePlayers.length > 3" :style="animationTime">
            <PlayerCard :player="activePlayers[getPlayerIndexes[2]]"/>
        </div>

        <div id="upper" :class="{upperCard: flipCardsOngoing}" :style="animationTime">
            <PlayerCard :player="activePlayers[getPlayerIndexes[1]]"/>
        </div>

        <div id="center" :class="{centerCard: flipCardsOngoing && activePlayers.length > 2, centerCardTwoPlayers: flipCardsOngoing && activePlayers.length === 2}" :style="animationTime">
            <PlayerCard :player="activePlayers[getPlayerIndexes[0]]"/>
        </div>

        <div id="lower" :class="{lowerCard: flipCardsOngoing && activePlayers.length > 3, lowerCardThreePlayers: flipCardsOngoing && activePlayers.length === 3}"  v-if="activePlayers.length > 2"  :style="animationTime">
            <PlayerCard v-if="activePlayers.length > 3" :player="activePlayers[getPlayerIndexes[getPlayerIndexes.length - 1]]"/>
            <PlayerCard v-else :player="activePlayers[getPlayerIndexes[2]]"/>
        </div>

    </div>

</template>


<script>

    import PlayerCard from '@/components/PlayerCard.vue';

    export default {

        components: {
            PlayerCard
        },

        props: [
            "activePlayers"
        ],
        

        computed: {

            getPlayerIndexes() {
                return this.$store.getters.getPlayerIndexes;
            },

            flipCardsOngoing() {
                return this.$store.getters.flipCardsOngoing;
            },

            animationTime() {
                
                return {"--animation-time": (this.$store.getters.getAnimationTime / 1000).toFixed(1) + "s"}
            }
            
        }
        
    }

</script>



<style scoped>


    * {
        box-sizing: border-box;
    }


    #card-div {
        width: 100%;
        text-align: left;
        position: relative;
    }


    #card-div p {
        font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    }


    @media (max-width: 767px) {

        #hidden {
            width: 45.000000vw;
            height: 14.062500vw;
            font-size: 4.218750vw;
            position: absolute;
            top: 4.843750vw;
            left: 19.500000vw;
            box-shadow: 2.250000vw 2.812500vw 2.250000vw grey;
            opacity: 0;
            z-index: -400;
        }


        #upper {
            width: 60.000000vw;
            height: 18.750000vw;
            font-size: 5.625000vw;
            position: absolute;
            top: 2.500000vw;
            left: 12.000000vw;
            box-shadow: 3.000000vw 3.750000vw 3.000000vw grey;
            z-index: 0;
        }


        #center {
            width: 80.000000vw;
            height: 25.000000vw;
            font-size: 7.500000vw;
            position: absolute;
            top: 23.750000vw;
            left: 2.000000vw;
            box-shadow: 4.000000vw 5.000000vw 4.000000vw grey;
            z-index: 400;
        }


        #lower {
            width: 60.000000vw;
            height: 18.750000vw;
            font-size: 5.625000vw;
            position: absolute;
            top: 51.250000vw;
            left: 12.000000vw;
            box-shadow: 3.000000vw 3.750000vw 3.000000vw grey;
            z-index: 0;
        }


        /* -------------------------------------------------------------------------- */

        .hiddenCard {
            -webkit-animation-name: hiddenCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: hiddenCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes hiddenCardAnimation {
            0%   {width: 45.000000vw; height: 14.062500vw; font-size: 4.218750vw; top: 4.843750vw; left: 19.500000vw; box-shadow: 2.250000vw 2.812500vw 2.250000vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 48.750000vw; height: 15.234375vw; font-size: 4.570313vw; top: 4.257813vw; left: 17.625000vw; box-shadow: 2.437500vw 3.046875vw 2.437500vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 52.500000vw; height: 16.406250vw; font-size: 4.921875vw; top: 3.671875vw; left: 15.750000vw; box-shadow: 2.625000vw 3.281250vw 2.625000vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 56.250000vw; height: 17.578125vw; font-size: 5.273438vw; top: 3.085938vw; left: 13.875000vw; box-shadow: 2.812500vw 3.515625vw 2.812500vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; opacity: 1.00; z-index:    0;}
        }

            
        /* Standard syntax */
        @keyframes hiddenCardAnimation {
            0%   {width: 45.000000vw; height: 14.062500vw; font-size: 4.218750vw; top: 4.843750vw; left: 19.500000vw; box-shadow: 2.250000vw 2.812500vw 2.250000vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 48.750000vw; height: 15.234375vw; font-size: 4.570313vw; top: 4.257813vw; left: 17.625000vw; box-shadow: 2.437500vw 3.046875vw 2.437500vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 52.500000vw; height: 16.406250vw; font-size: 4.921875vw; top: 3.671875vw; left: 15.750000vw; box-shadow: 2.625000vw 3.281250vw 2.625000vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 56.250000vw; height: 17.578125vw; font-size: 5.273438vw; top: 3.085938vw; left: 13.875000vw; box-shadow: 2.812500vw 3.515625vw 2.812500vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; opacity: 1.00; z-index:    0;}
        }

        /* -------------------------------------------------------------------------- */

        .upperCard {
            -webkit-animation-name: upperCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: upperCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes upperCardAnimation {
            0%   {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top:  2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
            25%  {width: 65.000000vw; height: 20.312500vw; font-size: 6.093750vw; top:  7.812500vw; left:  9.500000vw; box-shadow: 3.250000vw 4.062500vw 3.250000vw grey; z-index: 100;}
            50%  {width: 70.000000vw; height: 21.875000vw; font-size: 6.562500vw; top: 13.125000vw; left:  7.000000vw; box-shadow: 3.500000vw 4.375000vw 3.500000vw grey; z-index: 200;}
            75%  {width: 75.000000vw; height: 23.437500vw; font-size: 7.031250vw; top: 18.437500vw; left:  4.500000vw; box-shadow: 3.750000vw 4.687500vw 3.750000vw grey; z-index: 300;}
            100% {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
        }

            
        /* Standard syntax */
        @keyframes upperCardAnimation {
            0%   {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top:  2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
            25%  {width: 65.000000vw; height: 20.312500vw; font-size: 6.093750vw; top:  7.812500vw; left:  9.500000vw; box-shadow: 3.250000vw 4.062500vw 3.250000vw grey; z-index: 100;}
            50%  {width: 70.000000vw; height: 21.875000vw; font-size: 6.562500vw; top: 13.125000vw; left:  7.000000vw; box-shadow: 3.500000vw 4.375000vw 3.500000vw grey; z-index: 200;}
            75%  {width: 75.000000vw; height: 23.437500vw; font-size: 7.031250vw; top: 18.437500vw; left:  4.500000vw; box-shadow: 3.750000vw 4.687500vw 3.750000vw grey; z-index: 300;}
            100% {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
        }

        /* -------------------------------------------------------------------------- */

        .centerCard {
            -webkit-animation-name: centerCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: centerCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes centerCardAnimation {
            0%   {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
            25%  {width: 75.000000vw; height: 23.437500vw; font-size: 7.031250vw; top: 30.625000vw; left:  4.500000vw; box-shadow: 3.750000vw 4.687500vw 3.750000vw grey; z-index: 300;}
            50%  {width: 70.000000vw; height: 21.875000vw; font-size: 6.562500vw; top: 37.500000vw; left:  7.000000vw; box-shadow: 3.500000vw 4.375000vw 3.500000vw grey; z-index: 200;}
            75%  {width: 65.000000vw; height: 20.312500vw; font-size: 6.093750vw; top: 44.375000vw; left:  9.500000vw; box-shadow: 3.250000vw 4.062500vw 3.250000vw grey; z-index: 100;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 51.250000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
        }
            

        /* Standard syntax */
        @keyframes centerCardAnimation {
            0%   {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
            25%  {width: 75.000000vw; height: 23.437500vw; font-size: 7.031250vw; top: 30.625000vw; left:  4.500000vw; box-shadow: 3.750000vw 4.687500vw 3.750000vw grey; z-index: 300;}
            50%  {width: 70.000000vw; height: 21.875000vw; font-size: 6.562500vw; top: 37.500000vw; left:  7.000000vw; box-shadow: 3.500000vw 4.375000vw 3.500000vw grey; z-index: 200;}
            75%  {width: 65.000000vw; height: 20.312500vw; font-size: 6.093750vw; top: 44.375000vw; left:  9.500000vw; box-shadow: 3.250000vw 4.062500vw 3.250000vw grey; z-index: 100;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 51.250000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
        }

        /* -------------------------------------------------------------------------- */

        .lowerCard {
            -webkit-animation-name: lowerCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: lowerCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes lowerCardAnimation {
            0%   {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 51.250000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 56.250000vw; height: 17.578125vw; font-size: 5.273438vw; top: 51.835938vw; left: 13.875000vw; box-shadow: 2.812500vw 3.515625vw 2.812500vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 52.500000vw; height: 16.406250vw; font-size: 4.921875vw; top: 52.421875vw; left: 15.750000vw; box-shadow: 2.625000vw 3.281250vw 2.625000vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 48.750000vw; height: 15.234375vw; font-size: 4.570313vw; top: 53.007813vw; left: 17.625000vw; box-shadow: 2.437500vw 3.046875vw 2.437500vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 45.000000vw; height: 14.062500vw; font-size: 4.218750vw; top: 53.593750vw; left: 19.500000vw; box-shadow: 2.250000vw 2.812500vw 2.250000vw grey; opacity: 0.00; z-index: -400;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardAnimation {
            0%   {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top: 51.250000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 56.250000vw; height: 17.578125vw; font-size: 5.273438vw; top: 51.835938vw; left: 13.875000vw; box-shadow: 2.812500vw 3.515625vw 2.812500vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 52.500000vw; height: 16.406250vw; font-size: 4.921875vw; top: 52.421875vw; left: 15.750000vw; box-shadow: 2.625000vw 3.281250vw 2.625000vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 48.750000vw; height: 15.234375vw; font-size: 4.570313vw; top: 53.007813vw; left: 17.625000vw; box-shadow: 2.437500vw 3.046875vw 2.437500vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 45.000000vw; height: 14.062500vw; font-size: 4.218750vw; top: 53.593750vw; left: 19.500000vw; box-shadow: 2.250000vw 2.812500vw 2.250000vw grey; opacity: 0.00; z-index: -400;}
        }



        /* Three players */

        /* ----------------------------------------------------------------------------------------------------------- */

        .lowerCardThreePlayers {
            -webkit-animation-name: lowerCardThreePlayersAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: lowerCardThreePlayersAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes lowerCardThreePlayersAnimation {
            0%   {top: 51.250000vw;}
            25%  {top: 39.062500vw;}
            50%  {top: 26.875000vw;}
            75%  {top: 14.687500vw;}
            100% {top:  2.500000vw;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardThreePlayersAnimation {
            0%   {top: 51.250000vw;}
            25%  {top: 39.062500vw;}
            50%  {top: 26.875000vw;}
            75%  {top: 14.687500vw;}
            100% {top:  2.500000vw;}
        }
        


        /* Two players */

        /* ----------------------------------------------------------------------------------------------------------- */

        .centerCardTwoPlayers {
            -webkit-animation-name: centerCardTwoPlayersAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: centerCardTwoPlayersAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes centerCardTwoPlayersAnimation {
            0%   {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
            10%  {width: 78.573000vw; height: 24.554063vw; font-size: 7.366219vw; top: 30.440351vw; left:  2.713500vw; box-shadow: 3.928650vw 4.910813vw 3.928650vw grey; z-index: 371;}
            20%  {width: 76.786000vw; height: 23.995625vw; font-size: 7.198688vw; top: 37.040064vw; left:  3.607000vw; box-shadow: 3.839300vw 4.799125vw 3.839300vw grey; z-index: 336;}
            30%  {width: 74.064000vw; height: 23.145000vw; font-size: 6.943500vw; top: 43.292595vw; left:  4.968000vw; box-shadow: 3.703200vw 4.629000vw 3.703200vw grey; z-index: 281;}
            40%  {width: 68.931000vw; height: 21.540938vw; font-size: 6.462281vw; top: 42.598884vw; left:  7.534500vw; box-shadow: 3.446550vw 4.308188vw 3.446550vw grey; z-index: 179;}
            50%  {width: 66.375000vw; height: 20.742188vw; font-size: 6.222656vw; top: 36.168166vw; left:  8.812500vw; box-shadow: 3.318750vw 4.148438vw 3.318750vw grey; z-index: 128;}
            60%  {width: 64.631000vw; height: 20.197188vw; font-size: 6.059156vw; top: 29.458368vw; left:  9.684500vw; box-shadow: 3.231550vw 4.039438vw 3.231550vw grey; z-index:  93;}
            70%  {width: 63.241000vw; height: 19.762813vw; font-size: 5.928844vw; top: 22.761685vw; left: 10.379500vw; box-shadow: 3.162050vw 3.952563vw 3.162050vw grey; z-index:  65;}
            80%  {width: 62.043000vw; height: 19.388438vw; font-size: 5.816531vw; top: 16.030012vw; left: 10.978500vw; box-shadow: 3.102150vw 3.877688vw 3.102150vw grey; z-index:  41;}
            90%  {width: 60.974000vw; height: 19.054375vw; font-size: 5.716313vw; top:  9.272825vw; left: 11.513000vw; box-shadow: 3.048700vw 3.810875vw 3.048700vw grey; z-index:  19;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top:  2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
        }

            
        /* Standard syntax */
        @keyframes centerCardTwoPlayersAnimation {
            0%   {width: 80.000000vw; height: 25.000000vw; font-size: 7.500000vw; top: 23.750000vw; left:  2.000000vw; box-shadow: 4.000000vw 5.000000vw 4.000000vw grey; z-index: 400;}
            10%  {width: 78.573000vw; height: 24.554063vw; font-size: 7.366219vw; top: 30.440351vw; left:  2.713500vw; box-shadow: 3.928650vw 4.910813vw 3.928650vw grey; z-index: 371;}
            20%  {width: 76.786000vw; height: 23.995625vw; font-size: 7.198688vw; top: 37.040064vw; left:  3.607000vw; box-shadow: 3.839300vw 4.799125vw 3.839300vw grey; z-index: 336;}
            30%  {width: 74.064000vw; height: 23.145000vw; font-size: 6.943500vw; top: 43.292595vw; left:  4.968000vw; box-shadow: 3.703200vw 4.629000vw 3.703200vw grey; z-index: 281;}
            40%  {width: 68.931000vw; height: 21.540938vw; font-size: 6.462281vw; top: 42.598884vw; left:  7.534500vw; box-shadow: 3.446550vw 4.308188vw 3.446550vw grey; z-index: 179;}
            50%  {width: 66.375000vw; height: 20.742188vw; font-size: 6.222656vw; top: 36.168166vw; left:  8.812500vw; box-shadow: 3.318750vw 4.148438vw 3.318750vw grey; z-index: 128;}
            60%  {width: 64.631000vw; height: 20.197188vw; font-size: 6.059156vw; top: 29.458368vw; left:  9.684500vw; box-shadow: 3.231550vw 4.039438vw 3.231550vw grey; z-index:  93;}
            70%  {width: 63.241000vw; height: 19.762813vw; font-size: 5.928844vw; top: 22.761685vw; left: 10.379500vw; box-shadow: 3.162050vw 3.952563vw 3.162050vw grey; z-index:  65;}
            80%  {width: 62.043000vw; height: 19.388438vw; font-size: 5.816531vw; top: 16.030012vw; left: 10.978500vw; box-shadow: 3.102150vw 3.877688vw 3.102150vw grey; z-index:  41;}
            90%  {width: 60.974000vw; height: 19.054375vw; font-size: 5.716313vw; top:  9.272825vw; left: 11.513000vw; box-shadow: 3.048700vw 3.810875vw 3.048700vw grey; z-index:  19;}
            100% {width: 60.000000vw; height: 18.750000vw; font-size: 5.625000vw; top:  2.500000vw; left: 12.000000vw; box-shadow: 3.000000vw 3.750000vw 3.000000vw grey; z-index:   0;}
        }

    }


    @media (min-width: 768px) {

        #hidden {
            width: 16.875000vw;
            height: 5.273438vw;
            font-size: 1.582031vw;
            position: absolute;
            top: 1.816406vw;
            left: 7.312500vw;
            box-shadow: 0.843750vw 1.054688vw 0.843750vw grey;
            opacity: 0;
            z-index: -400;
        }


        #upper {
            width: 22.500000vw;
            height: 7.031250vw;
            font-size: 2.109375vw;
            position: absolute;
            top: 0.937500vw;
            left: 4.500000vw;
            box-shadow: 1.125000vw 1.406250vw 1.125000vw grey;
            z-index: 0;
        }


        #center {
            width: 30.000000vw;
            height: 9.375000vw;
            font-size: 2.812500vw;
            position: absolute;
            top: 8.906250vw;
            left: 0.750000vw;
            box-shadow: 1.500000vw 1.875000vw 1.500000vw grey;
            z-index: 400;
        }


        #lower {
            width: 22.500000vw;
            height: 7.031250vw;
            font-size: 2.109375vw;
            position: absolute;
            top: 19.218750vw;
            left: 4.500000vw;
            box-shadow: 1.125000vw 1.406250vw 1.125000vw grey;
            z-index: 0;
        }


        /* -------------------------------------------------------------------------- */

        .hiddenCard {
            -webkit-animation-name: hiddenCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: hiddenCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes hiddenCardAnimation {
            0%   {width: 11.250000vw; height: 5.625000vw; font-size: 1.687500vw; top: 1.937500vw; left: 4.875000vw; box-shadow: 0.562500vw 1.125000vw 0.562500vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 12.187500vw; height: 6.093750vw; font-size: 1.828125vw; top: 1.703125vw; left: 4.406250vw; box-shadow: 0.609375vw 1.218750vw 0.609375vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 13.125000vw; height: 6.562500vw; font-size: 1.968750vw; top: 1.468750vw; left: 3.937500vw; box-shadow: 0.656250vw 1.312500vw 0.656250vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 14.062500vw; height: 7.031250vw; font-size: 2.109375vw; top: 1.234375vw; left: 3.468750vw; box-shadow: 0.703125vw 1.406250vw 0.703125vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 15.000000vw; height: 7.500000vw; font-size: 2.250000vw; top: 1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; opacity: 1.00; z-index:    0;}
        }

            
        /* Standard syntax */
        @keyframes hiddenCardAnimation {
            0%   {width: 11.250000vw; height: 5.625000vw; font-size: 1.687500vw; top: 1.937500vw; left: 4.875000vw; box-shadow: 0.562500vw 1.125000vw 0.562500vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 12.187500vw; height: 6.093750vw; font-size: 1.828125vw; top: 1.703125vw; left: 4.406250vw; box-shadow: 0.609375vw 1.218750vw 0.609375vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 13.125000vw; height: 6.562500vw; font-size: 1.968750vw; top: 1.468750vw; left: 3.937500vw; box-shadow: 0.656250vw 1.312500vw 0.656250vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 14.062500vw; height: 7.031250vw; font-size: 2.109375vw; top: 1.234375vw; left: 3.468750vw; box-shadow: 0.703125vw 1.406250vw 0.703125vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 15.000000vw; height: 7.500000vw; font-size: 2.250000vw; top: 1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; opacity: 1.00; z-index:    0;}
        }


        /* -------------------------------------------------------------------------- */

        .upperCard {
            -webkit-animation-name: upperCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: upperCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes upperCardAnimation {
            0%   {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top: 1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
            25%  {width: 16.250000vw; height:  8.125000vw; font-size: 2.437500vw; top: 3.125000vw; left: 2.375000vw; box-shadow: 0.812500vw 1.625000vw 0.812500vw grey; z-index: 100;}
            50%  {width: 17.500000vw; height:  8.750000vw; font-size: 2.625000vw; top: 5.250000vw; left: 1.750000vw; box-shadow: 0.875000vw 1.750000vw 0.875000vw grey; z-index: 200;}
            75%  {width: 18.750000vw; height:  9.375000vw; font-size: 2.812500vw; top: 7.375000vw; left: 1.125000vw; box-shadow: 0.937500vw 1.875000vw 0.937500vw grey; z-index: 300;}
            100% {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top: 9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
        }
            

        /* Standard syntax */
        @keyframes upperCardAnimation {
            0%   {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top: 1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
            25%  {width: 16.250000vw; height:  8.125000vw; font-size: 2.437500vw; top: 3.125000vw; left: 2.375000vw; box-shadow: 0.812500vw 1.625000vw 0.812500vw grey; z-index: 100;}
            50%  {width: 17.500000vw; height:  8.750000vw; font-size: 2.625000vw; top: 5.250000vw; left: 1.750000vw; box-shadow: 0.875000vw 1.750000vw 0.875000vw grey; z-index: 200;}
            75%  {width: 18.750000vw; height:  9.375000vw; font-size: 2.812500vw; top: 7.375000vw; left: 1.125000vw; box-shadow: 0.937500vw 1.875000vw 0.937500vw grey; z-index: 300;}
            100% {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top: 9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
        }


        /* -------------------------------------------------------------------------- */

        .centerCard {
            -webkit-animation-name: centerCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: centerCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes centerCardAnimation {
            0%   {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top:  9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
            25%  {width: 18.750000vw; height:  9.375000vw; font-size: 2.812500vw; top: 12.250000vw; left: 1.125000vw; box-shadow: 0.937500vw 1.875000vw 0.937500vw grey; z-index: 300;}
            50%  {width: 17.500000vw; height:  8.750000vw; font-size: 2.625000vw; top: 15.000000vw; left: 1.750000vw; box-shadow: 0.875000vw 1.750000vw 0.875000vw grey; z-index: 200;}
            75%  {width: 16.250000vw; height:  8.125000vw; font-size: 2.437500vw; top: 17.750000vw; left: 2.375000vw; box-shadow: 0.812500vw 1.625000vw 0.812500vw grey; z-index: 100;}
            100% {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top: 20.500000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
        }

            
        /* Standard syntax */
        @keyframes centerCardAnimation {
            0%   {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top:  9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
            25%  {width: 18.750000vw; height:  9.375000vw; font-size: 2.812500vw; top: 12.250000vw; left: 1.125000vw; box-shadow: 0.937500vw 1.875000vw 0.937500vw grey; z-index: 300;}
            50%  {width: 17.500000vw; height:  8.750000vw; font-size: 2.625000vw; top: 15.000000vw; left: 1.750000vw; box-shadow: 0.875000vw 1.750000vw 0.875000vw grey; z-index: 200;}
            75%  {width: 16.250000vw; height:  8.125000vw; font-size: 2.437500vw; top: 17.750000vw; left: 2.375000vw; box-shadow: 0.812500vw 1.625000vw 0.812500vw grey; z-index: 100;}
            100% {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top: 20.500000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
        }

        /* -------------------------------------------------------------------------- */

        .lowerCard {
            -webkit-animation-name: lowerCardAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: lowerCardAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }

        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes lowerCardAnimation {
            0%   {width: 15.000000vw; height: 7.500000vw; font-size: 2.250000vw; top: 20.500000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 14.062500vw; height: 7.031250vw; font-size: 2.109375vw; top: 20.734375vw; left: 3.468750vw; box-shadow: 0.703125vw 1.406250vw 0.703125vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 13.125000vw; height: 6.562500vw; font-size: 1.968750vw; top: 20.968750vw; left: 3.937500vw; box-shadow: 0.656250vw 1.312500vw 0.656250vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 12.187500vw; height: 6.093750vw; font-size: 1.828125vw; top: 21.203125vw; left: 4.406250vw; box-shadow: 0.609375vw 1.218750vw 0.609375vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 11.250000vw; height: 5.625000vw; font-size: 1.687500vw; top: 21.437500vw; left: 4.875000vw; box-shadow: 0.562500vw 1.125000vw 0.562500vw grey; opacity: 0.00; z-index: -400;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardAnimation {
            0%   {width: 15.000000vw; height: 7.500000vw; font-size: 2.250000vw; top: 20.500000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 14.062500vw; height: 7.031250vw; font-size: 2.109375vw; top: 20.734375vw; left: 3.468750vw; box-shadow: 0.703125vw 1.406250vw 0.703125vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 13.125000vw; height: 6.562500vw; font-size: 1.968750vw; top: 20.968750vw; left: 3.937500vw; box-shadow: 0.656250vw 1.312500vw 0.656250vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 12.187500vw; height: 6.093750vw; font-size: 1.828125vw; top: 21.203125vw; left: 4.406250vw; box-shadow: 0.609375vw 1.218750vw 0.609375vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 11.250000vw; height: 5.625000vw; font-size: 1.687500vw; top: 21.437500vw; left: 4.875000vw; box-shadow: 0.562500vw 1.125000vw 0.562500vw grey; opacity: 0.00; z-index: -400;}
        }



        /* Three players */

        /* ----------------------------------------------------------------------------------------------------------- */

        .lowerCardThreePlayers {
            -webkit-animation-name: lowerCardThreePlayersAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: lowerCardThreePlayersAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes lowerCardThreePlayersAnimation {
            0%   {top: 20.500000vw;}
            25%  {top: 15.625000vw;}
            50%  {top: 10.750000vw;}
            75%  {top: 5.875000vw;}
            100% {top: 1.000000vw;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardThreePlayersAnimation {
            0%   {top: 20.500000vw;}
            25%  {top: 15.625000vw;}
            50%  {top: 10.750000vw;}
            75%  {top: 5.875000vw;}
            100% {top: 1.000000vw;}
        }



        /* Two players */

        /* ----------------------------------------------------------------------------------------------------------- */

        .centerCardTwoPlayers {
            -webkit-animation-name: centerCardTwoPlayersAnimation; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: var(--animation-time); /* Safari 4.0 - 8.0 */
            animation-name: centerCardTwoPlayersAnimation;
            animation-duration: var(--animation-time);
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }


        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes centerCardTwoPlayersAnimation {
            0%   {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top:  9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
            10%  {width: 19.653000vw; height:  9.826500vw; font-size: 2.947950vw; top: 12.107408vw; left: 0.673500vw; box-shadow: 0.982650vw 1.965300vw 0.982650vw grey; z-index: 372;}
            20%  {width: 19.219000vw; height:  9.609500vw; font-size: 2.882850vw; top: 14.699969vw; left: 0.890500vw; box-shadow: 0.960950vw 1.921900vw 0.960950vw grey; z-index: 338;}
            30%  {width: 18.548000vw; height:  9.274000vw; font-size: 2.782200vw; top: 17.238942vw; left: 1.226000vw; box-shadow: 0.927400vw 1.854800vw 0.927400vw grey; z-index: 284;}
            40%  {width: 17.116000vw; height:  8.558000vw; font-size: 2.567400vw; top: 16.689553vw; left: 1.942000vw; box-shadow: 0.855800vw 1.711600vw 0.855800vw grey; z-index: 169;}
            50%  {width: 16.531000vw; height:  8.265500vw; font-size: 2.479650vw; top: 14.126820vw; left: 2.234500vw; box-shadow: 0.826550vw 1.653100vw 0.826550vw grey; z-index: 122;}
            60%  {width: 16.122000vw; height:  8.061000vw; font-size: 2.418300vw; top: 11.529446vw; left: 2.439000vw; box-shadow: 0.806100vw 1.612200vw 0.806100vw grey; z-index:  90;}
            70%  {width: 15.788000vw; height:  7.894000vw; font-size: 2.368200vw; top:  8.916579vw; left: 2.606000vw; box-shadow: 0.789400vw 1.578800vw 0.789400vw grey; z-index:  63;}
            80%  {width: 15.499000vw; height:  7.749500vw; font-size: 2.324850vw; top:  6.298947vw; left: 2.750500vw; box-shadow: 0.774950vw 1.549900vw 0.774950vw grey; z-index:  40;}
            90%  {width: 15.241000vw; height:  7.620500vw; font-size: 2.286150vw; top:  3.682429vw; left: 2.879500vw; box-shadow: 0.762050vw 1.524100vw 0.762050vw grey; z-index:  19;}
            100% {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top:  1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
        }
            
            
        /* Standard syntax */
        @keyframes centerCardTwoPlayersAnimation {
            0%   {width: 20.000000vw; height: 10.000000vw; font-size: 3.000000vw; top:  9.500000vw; left: 0.500000vw; box-shadow: 1.000000vw 2.000000vw 1.000000vw grey; z-index: 400;}
            10%  {width: 19.653000vw; height:  9.826500vw; font-size: 2.947950vw; top: 12.107408vw; left: 0.673500vw; box-shadow: 0.982650vw 1.965300vw 0.982650vw grey; z-index: 372;}
            20%  {width: 19.219000vw; height:  9.609500vw; font-size: 2.882850vw; top: 14.699969vw; left: 0.890500vw; box-shadow: 0.960950vw 1.921900vw 0.960950vw grey; z-index: 338;}
            30%  {width: 18.548000vw; height:  9.274000vw; font-size: 2.782200vw; top: 17.238942vw; left: 1.226000vw; box-shadow: 0.927400vw 1.854800vw 0.927400vw grey; z-index: 284;}
            40%  {width: 17.116000vw; height:  8.558000vw; font-size: 2.567400vw; top: 16.689553vw; left: 1.942000vw; box-shadow: 0.855800vw 1.711600vw 0.855800vw grey; z-index: 169;}
            50%  {width: 16.531000vw; height:  8.265500vw; font-size: 2.479650vw; top: 14.126820vw; left: 2.234500vw; box-shadow: 0.826550vw 1.653100vw 0.826550vw grey; z-index: 122;}
            60%  {width: 16.122000vw; height:  8.061000vw; font-size: 2.418300vw; top: 11.529446vw; left: 2.439000vw; box-shadow: 0.806100vw 1.612200vw 0.806100vw grey; z-index:  90;}
            70%  {width: 15.788000vw; height:  7.894000vw; font-size: 2.368200vw; top:  8.916579vw; left: 2.606000vw; box-shadow: 0.789400vw 1.578800vw 0.789400vw grey; z-index:  63;}
            80%  {width: 15.499000vw; height:  7.749500vw; font-size: 2.324850vw; top:  6.298947vw; left: 2.750500vw; box-shadow: 0.774950vw 1.549900vw 0.774950vw grey; z-index:  40;}
            90%  {width: 15.241000vw; height:  7.620500vw; font-size: 2.286150vw; top:  3.682429vw; left: 2.879500vw; box-shadow: 0.762050vw 1.524100vw 0.762050vw grey; z-index:  19;}
            100% {width: 15.000000vw; height:  7.500000vw; font-size: 2.250000vw; top:  1.000000vw; left: 3.000000vw; box-shadow: 0.750000vw 1.500000vw 0.750000vw grey; z-index:   0;}
        }

    }

</style>