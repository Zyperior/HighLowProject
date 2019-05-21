<template>
    <div id="card-div">

        <div id="hidden" :class="{hiddenCard: flipCards}" v-if="activePlayers.length > 3">
            <p>{{ activePlayers[2].name }}, {{ activePlayers[2].answer }}</p>
        </div>

        <div id="upper" :class="{upperCard: flipCards}">
            <p>{{ activePlayers[1].name }}, {{ activePlayers[1].answer }}</p>
        </div>

        <div id="center" :class="{centerCard: flipCards && activePlayers.length > 2, centerCardTwoPlayers: flipCards && activePlayers.length === 2}">
            <p>{{ activePlayers[0].name }}, {{ activePlayers[0].answer }}</p>
        </div>

        <div id="lower" :class="{lowerCard: flipCards && activePlayers.length > 3, lowerCardThreePlayers: flipCards && activePlayers.length === 3}"  v-if="activePlayers.length > 2">
            <p v-if="activePlayers.length > 3">{{ activePlayers[activePlayers.length - 1].name }}, {{ activePlayers[activePlayers.length - 1].answer }}</p>
            <p v-else>{{ activePlayers[2].name }}, {{ activePlayers[2].answer }}</p>
        </div>


        <!-- <br>
        <br>
        <button @click="startFlipCards">Flip</button> -->

    </div>
</template>




<script>
export default {

    props: [

        "activePlayers"

    ],
    
    methods: {

        flipCards: function() {
            console.log("Array length = " + arrayLength);
            this.$store.commit("flipCards", this.activePlayers.length);            
        }
        
    },

    computed: {

        getIndexCurrentPlayer() {
            return this.$store.getters.getIndexCurrentPlayer;
        }
        
    }
    
}
</script>







<style scoped>

    * {
    box-sizing: border-box;
    }

    /* #cardholder-div {
    height: 29vw;
    width: 21vw;
    margin: auto;
    text-align: center;
    } */


    #card-div {
    width: 100%;
    text-align: center;
    position: relative;
    border: 1px solid red;
    }

    #card-div div {
    margin-left: auto;
    margin-right: auto;
    background-color: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    #card-div p {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    }


    /* hidden */

    #hidden {
    width: 11.250000vw;
    height: 5.625000vw;
    font-size: 1.687500vw;
    position: absolute;
    top: 1.937500vw;
    left: 4.875000vw;
    box-shadow: 0.562500vw 1.125000vw 0.562500vw grey;
    opacity: 0;
    z-index: -400;
    }


    /* upper */

    #upper {
    width: 15.000000vw;
    height: 7.500000vw;
    font-size: 2.250000vw;
    position: absolute;
    top: 1.000000vw;
    left: 3.000000vw;
    box-shadow: 0.750000vw 1.500000vw 0.750000vw grey;
    z-index: 0;
    }


    /* center */

    #center {
    width: 20.000000vw;
    height: 10.000000vw;
    font-size: 3.000000vw;
    position: absolute;
    top: 9.500000vw;
    left: 0.500000vw;
    box-shadow: 1.000000vw 2.000000vw 1.000000vw grey;
    z-index: 400;
    }


    /* lower */

    #lower {
    width: 15.000000vw;
    height: 7.500000vw;
    font-size: 2.250000vw;
    position: absolute;
    top: 20.500000vw;
    left: 3.000000vw;
    box-shadow: 0.750000vw 1.500000vw 0.750000vw grey;
    z-index: 0;
    }


    #card-div button {
    height: 5vw;
    width: 10vw;
    font-size: 2vw;
    position: absolute;
    top: 30vw;
    left: 5.5vw;
    }


    /* -------------------------------------------------------------------------- */

    .hiddenCard {
    -webkit-animation-name: hiddenCardAnimation; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
    animation-name: hiddenCardAnimation;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
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
    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
    animation-name: upperCardAnimation;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
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
    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
    animation-name: centerCardAnimation;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
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
    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
    animation-name: lowerCardAnimation;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
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



    /* För fallet med tre spelare */

    /* ----------------------------------------------------------------------------------------------------------- */


    

    .lowerCardThreePlayers {
    -webkit-animation-name: lowerCardThreePlayersAnimation; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
    animation-name: lowerCardThreePlayersAnimation;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
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




    /* För fallet med två spelare */

    /* ----------------------------------------------------------------------------------------------------------- */


    

    .centerCardTwoPlayers {
        -webkit-animation-name: centerCardTwoPlayersAnimation; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
        animation-name: centerCardTwoPlayersAnimation;
        animation-duration: 1.5s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
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

</style>