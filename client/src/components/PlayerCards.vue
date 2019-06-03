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
            0%   {width: 16.875000vw; height: 5.273438vw; font-size: 1.582031vw; top: 1.816406vw; left: 7.312500vw; box-shadow: 0.843750vw 1.054688vw 0.843750vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 18.281250vw; height: 5.712891vw; font-size: 1.713867vw; top: 1.596680vw; left: 6.609375vw; box-shadow: 0.914063vw 1.142578vw 0.914063vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 19.687500vw; height: 6.152344vw; font-size: 1.845703vw; top: 1.376953vw; left: 5.906250vw; box-shadow: 0.984375vw 1.230469vw 0.984375vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 21.093750vw; height: 6.591797vw; font-size: 1.977539vw; top: 1.157227vw; left: 5.203125vw; box-shadow: 1.054688vw 1.318359vw 1.054688vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; opacity: 1.00; z-index:    0;}
        }

            
        /* Standard syntax */
        @keyframes hiddenCardAnimation {
            0%   {width: 16.875000vw; height: 5.273438vw; font-size: 1.582031vw; top: 1.816406vw; left: 7.312500vw; box-shadow: 0.843750vw 1.054688vw 0.843750vw grey; opacity: 0.00; z-index: -400;}
            25%  {width: 18.281250vw; height: 5.712891vw; font-size: 1.713867vw; top: 1.596680vw; left: 6.609375vw; box-shadow: 0.914063vw 1.142578vw 0.914063vw grey; opacity: 0.25; z-index: -300;}
            50%  {width: 19.687500vw; height: 6.152344vw; font-size: 1.845703vw; top: 1.376953vw; left: 5.906250vw; box-shadow: 0.984375vw 1.230469vw 0.984375vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 21.093750vw; height: 6.591797vw; font-size: 1.977539vw; top: 1.157227vw; left: 5.203125vw; box-shadow: 1.054688vw 1.318359vw 1.054688vw grey; opacity: 0.75; z-index: -100;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; opacity: 1.00; z-index:    0;}
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
            0%   {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
            25%  {width: 24.375000vw; height: 7.617188vw; font-size: 2.285156vw; top: 2.929688vw; left: 3.562500vw; box-shadow: 1.218750vw 1.523438vw 1.218750vw grey; z-index: 100;}
            50%  {width: 26.250000vw; height: 8.203125vw; font-size: 2.460938vw; top: 4.921875vw; left: 2.625000vw; box-shadow: 1.312500vw 1.640625vw 1.312500vw grey; z-index: 200;}
            75%  {width: 28.125000vw; height: 8.789063vw; font-size: 2.636719vw; top: 6.914063vw; left: 1.687500vw; box-shadow: 1.406250vw 1.757813vw 1.406250vw grey; z-index: 300;}
            100% {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top: 8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
        }
            

        /* Standard syntax */
        @keyframes upperCardAnimation {
            0%   {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
            25%  {width: 24.375000vw; height: 7.617188vw; font-size: 2.285156vw; top: 2.929688vw; left: 3.562500vw; box-shadow: 1.218750vw 1.523438vw 1.218750vw grey; z-index: 100;}
            50%  {width: 26.250000vw; height: 8.203125vw; font-size: 2.460938vw; top: 4.921875vw; left: 2.625000vw; box-shadow: 1.312500vw 1.640625vw 1.312500vw grey; z-index: 200;}
            75%  {width: 28.125000vw; height: 8.789063vw; font-size: 2.636719vw; top: 6.914063vw; left: 1.687500vw; box-shadow: 1.406250vw 1.757813vw 1.406250vw grey; z-index: 300;}
            100% {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top: 8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
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
            0%   {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top:  8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
            25%  {width: 28.125000vw; height: 8.789063vw; font-size: 2.636719vw; top: 11.484375vw; left: 1.687500vw; box-shadow: 1.406250vw 1.757813vw 1.406250vw grey; z-index: 300;}
            50%  {width: 26.250000vw; height: 8.203125vw; font-size: 2.460938vw; top: 14.062500vw; left: 2.625000vw; box-shadow: 1.312500vw 1.640625vw 1.312500vw grey; z-index: 200;}
            75%  {width: 24.375000vw; height: 7.617188vw; font-size: 2.285156vw; top: 16.640625vw; left: 3.562500vw; box-shadow: 1.218750vw 1.523438vw 1.218750vw grey; z-index: 100;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 19.218750vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
        }

            
        /* Standard syntax */
        @keyframes centerCardAnimation {
            0%   {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top:  8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
            25%  {width: 28.125000vw; height: 8.789063vw; font-size: 2.636719vw; top: 11.484375vw; left: 1.687500vw; box-shadow: 1.406250vw 1.757813vw 1.406250vw grey; z-index: 300;}
            50%  {width: 26.250000vw; height: 8.203125vw; font-size: 2.460938vw; top: 14.062500vw; left: 2.625000vw; box-shadow: 1.312500vw 1.640625vw 1.312500vw grey; z-index: 200;}
            75%  {width: 24.375000vw; height: 7.617188vw; font-size: 2.285156vw; top: 16.640625vw; left: 3.562500vw; box-shadow: 1.218750vw 1.523438vw 1.218750vw grey; z-index: 100;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 19.218750vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
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
            0%   {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 19.218750vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 21.093750vw; height: 6.591797vw; font-size: 1.977539vw; top: 19.438477vw; left: 5.203125vw; box-shadow: 1.054688vw 1.318359vw 1.054688vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 19.687500vw; height: 6.152344vw; font-size: 1.845703vw; top: 19.658203vw; left: 5.906250vw; box-shadow: 0.984375vw 1.230469vw 0.984375vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 18.281250vw; height: 5.712891vw; font-size: 1.713867vw; top: 19.877930vw; left: 6.609375vw; box-shadow: 0.914063vw 1.142578vw 0.914063vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 16.875000vw; height: 5.273438vw; font-size: 1.582031vw; top: 20.097656vw; left: 7.312500vw; box-shadow: 0.843750vw 1.054688vw 0.843750vw grey; opacity: 0.00; z-index: -400;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardAnimation {
            0%   {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top: 19.218750vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; opacity: 1.00; z-index:    0;}
            25%  {width: 21.093750vw; height: 6.591797vw; font-size: 1.977539vw; top: 19.438477vw; left: 5.203125vw; box-shadow: 1.054688vw 1.318359vw 1.054688vw grey; opacity: 0.75; z-index: -100;}
            50%  {width: 19.687500vw; height: 6.152344vw; font-size: 1.845703vw; top: 19.658203vw; left: 5.906250vw; box-shadow: 0.984375vw 1.230469vw 0.984375vw grey; opacity: 0.50; z-index: -200;}
            75%  {width: 18.281250vw; height: 5.712891vw; font-size: 1.713867vw; top: 19.877930vw; left: 6.609375vw; box-shadow: 0.914063vw 1.142578vw 0.914063vw grey; opacity: 0.25; z-index: -300;}
            100% {width: 16.875000vw; height: 5.273438vw; font-size: 1.582031vw; top: 20.097656vw; left: 7.312500vw; box-shadow: 0.843750vw 1.054688vw 0.843750vw grey; opacity: 0.00; z-index: -400;}
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
            0%   {top: 19.218750vw;}
            25%  {top: 14.648438vw;}
            50%  {top: 10.078125vw;}
            75%  {top:  5.507813vw;}
            100% {top:  0.937500vw;}
        }
            

        /* Standard syntax */
        @keyframes lowerCardThreePlayersAnimation {
            0%   {top: 19.218750vw;}
            25%  {top: 14.648438vw;}
            50%  {top: 10.078125vw;}
            75%  {top:  5.507813vw;}
            100% {top:  0.937500vw;}
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
            0%   {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top:  8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
            10%  {width: 29.635000vw; height: 9.260938vw; font-size: 2.778281vw; top: 10.668765vw; left: 0.932500vw; box-shadow: 1.481750vw 1.852188vw 1.481750vw grey; z-index: 381;}
            20%  {width: 29.234000vw; height: 9.135625vw; font-size: 2.740688vw; top: 12.351499vw; left: 1.133000vw; box-shadow: 1.461700vw 1.827125vw 1.461700vw grey; z-index: 359;}
            30%  {width: 28.785000vw; height: 8.995313vw; font-size: 2.698594vw; top: 13.920533vw; left: 1.357500vw; box-shadow: 1.439250vw 1.799063vw 1.439250vw grey; z-index: 335;}
            40%  {width: 28.264000vw; height: 8.832500vw; font-size: 2.649750vw; top: 15.323889vw; left: 1.618000vw; box-shadow: 1.413200vw 1.766500vw 1.413200vw grey; z-index: 307;}
            50%  {width: 27.635500vw; height: 8.636094vw; font-size: 2.590828vw; top: 16.420275vw; left: 1.932250vw; box-shadow: 1.381775vw 1.727219vw 1.381775vw grey; z-index: 274;}
            60%  {width: 26.739000vw; height: 8.355938vw; font-size: 2.506781vw; top: 16.855314vw; left: 2.380500vw; box-shadow: 1.336950vw 1.671188vw 1.336950vw grey; z-index: 226;}
            70%  {width: 24.833000vw; height: 7.760313vw; font-size: 2.328094vw; top: 13.369730vw; left: 3.333500vw; box-shadow: 1.241650vw 1.552063vw 1.241650vw grey; z-index: 124;}
            80%  {width: 23.761000vw; height: 7.425313vw; font-size: 2.227594vw; top:  8.773359vw; left: 3.869500vw; box-shadow: 1.188050vw 1.485063vw 1.188050vw grey; z-index:  67;}
            90%  {width: 23.056000vw; height: 7.205000vw; font-size: 2.161500vw; top:  4.716142vw; left: 4.222000vw; box-shadow: 1.152800vw 1.441000vw 1.152800vw grey; z-index:  30;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top:  0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
        }
            
            
        /* Standard syntax */
        @keyframes centerCardTwoPlayersAnimation {
            0%   {width: 30.000000vw; height: 9.375000vw; font-size: 2.812500vw; top:  8.906250vw; left: 0.750000vw; box-shadow: 1.500000vw 1.875000vw 1.500000vw grey; z-index: 400;}
            10%  {width: 29.635000vw; height: 9.260938vw; font-size: 2.778281vw; top: 10.668765vw; left: 0.932500vw; box-shadow: 1.481750vw 1.852188vw 1.481750vw grey; z-index: 381;}
            20%  {width: 29.234000vw; height: 9.135625vw; font-size: 2.740688vw; top: 12.351499vw; left: 1.133000vw; box-shadow: 1.461700vw 1.827125vw 1.461700vw grey; z-index: 359;}
            30%  {width: 28.785000vw; height: 8.995313vw; font-size: 2.698594vw; top: 13.920533vw; left: 1.357500vw; box-shadow: 1.439250vw 1.799063vw 1.439250vw grey; z-index: 335;}
            40%  {width: 28.264000vw; height: 8.832500vw; font-size: 2.649750vw; top: 15.323889vw; left: 1.618000vw; box-shadow: 1.413200vw 1.766500vw 1.413200vw grey; z-index: 307;}
            50%  {width: 27.635500vw; height: 8.636094vw; font-size: 2.590828vw; top: 16.420275vw; left: 1.932250vw; box-shadow: 1.381775vw 1.727219vw 1.381775vw grey; z-index: 274;}
            60%  {width: 26.739000vw; height: 8.355938vw; font-size: 2.506781vw; top: 16.855314vw; left: 2.380500vw; box-shadow: 1.336950vw 1.671188vw 1.336950vw grey; z-index: 226;}
            70%  {width: 24.833000vw; height: 7.760313vw; font-size: 2.328094vw; top: 13.369730vw; left: 3.333500vw; box-shadow: 1.241650vw 1.552063vw 1.241650vw grey; z-index: 124;}
            80%  {width: 23.761000vw; height: 7.425313vw; font-size: 2.227594vw; top:  8.773359vw; left: 3.869500vw; box-shadow: 1.188050vw 1.485063vw 1.188050vw grey; z-index:  67;}
            90%  {width: 23.056000vw; height: 7.205000vw; font-size: 2.161500vw; top:  4.716142vw; left: 4.222000vw; box-shadow: 1.152800vw 1.441000vw 1.152800vw grey; z-index:  30;}
            100% {width: 22.500000vw; height: 7.031250vw; font-size: 2.109375vw; top:  0.937500vw; left: 4.500000vw; box-shadow: 1.125000vw 1.406250vw 1.125000vw grey; z-index:   0;}
        }

    }

</style>