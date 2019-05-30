<template>
    <div class="container">
    <div class="bot-container">
        <img  v-for="(bot, index) in bots" :src="bot.imgSrc" alt="bot-profile-image" @click="activeBot = index;" class="bot-img" :key="bot.name" :class="{chosenBot: isChosenBot(index)}">
    </div>
        <div class="button-container">
        <img src="../assets/leftArrow.svg" v-if="hasPrev" alt="Left arrow" class="btn" id="prev-btn" @click="prevBot">
            <img src="../assets/arrowRight.svg" v-if="hasNext" alt="Right arrow" class="btn" id="next-btn" @click="nextBot">
        </div>
        <div class="bot-presentation">
    <botPresentation :bot="bots[activeBot]"></botPresentation>
        </div>
    </div>
</template>

<script>
    import botPresentation from '../components/BotPresentation.vue'

    export default {
        name: "botsProfile",
        components:{
            botPresentation
        },
        data() {
          return {
              activeBot: 0
          }
        },
        methods: {
            isChosenBot(index){
                return index == this.activeBot;
            },
            prevBot(){
                this.activeBot--;
            },
            nextBot(){
                this.activeBot++;
            }
        },
        computed: {
            hasNext(){
              return this.activeBot < this.bots.length-1;
            },
            hasPrev(){
              return this.activeBot > 0
            },
            bots(){
                return this.$store.getters.bots;
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-left: 12%;
        margin-right: 12%;
    }

    .bot-container {
        width: 100%;
        height: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .bot-img {
        width: 60px;
        height: 60px;
        flex-basis: 0;
        margin-left: 0.5em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        filter: brightness(25%);
        z-index: 0;
    }

    .chosenBot {
        filter: brightness(100%);
        border: 2px solid white;
        animation-name: blink;
        -webkit-animation-name: blink;
        animation-duration: 300ms;

    }

    @-webkit-keyframes blink {
        0% {
            opacity: 0.00;
            z-index: 200;
        }
        50% {
            opacity: 0.50;
            z-index: 300;
        }
        75% {
            opacity: 0.75;
            z-index: 400;
        }
        100% {
            opacity: 1.00;
            z-index: 500;
        }
    }
    .button-container {
        height: 20px;
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        overflow: hidden;
    }

    .btn {
        display: inline-block;
    }

    #prev-btn {
        grid-column: 1/2;
    }

    #next-btn {
        grid-column: 3/4;
    }

    botPresentation {
        animation-name: testAnimation;
        -webkit-animation-name: testAnimation;
    }
    @media(max-width: 415px) {
        .container{
            margin: 0;
        }
        .bot-img {
            width: 30px;
            height: 35px;
        }
        .bot-container{
            margin: 0;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
        .button-container {
            height: 20px;
            width: 100%;
            display: grid;
            grid-template-columns: 40px 1fr 40px;
            overflow: hidden;
        }

        .btn {
            display: inline-block;
        }

        #prev-btn {
            grid-column: 1/2;
        }

        #next-btn {
            grid-column: 3/4;
        }

    }

</style>