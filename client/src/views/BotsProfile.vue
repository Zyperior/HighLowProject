<template>
    <div class="container">
    <div class="bot-container">

        <img  v-for="(bot, index) in bots" :src="bot.imgSrc" alt="bot-profile-image" @click="activeBot = index; hasBot = true;" class="bot-img bot-index" :key="bot.name" :class="{chosenBot: isChosenBot(index)}">
    </div>
        <div class="button-container">
        <img src="../assets/leftArrow.svg" alt="Left arrow" class="btn" id="prev-btn" @click="prevBot">
            <img src="../assets/arrowRight.svg" alt="Right arrow" class="btn" id="next-btn" @click="nextBot">
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
              activeBot: 7,
              hasBot: false
          }
        },
        methods: {
            async getBot(bot){
                this.botInfo = await this.$store.dispatch('botStats/getBotStats', this.bot.name)
            },
            isChosenBot(index){
                return index == this.activeBot;
            },
            prevBot(){
               if(this.activeBot > 0)
                this.activeBot--;
            },
            nextBot(){
                if(this.activeBot < this.bots.length-1)
                    this.activeBot++;
            }
        },
        computed: {
            bots(){
                return this.$store.getters.bots;
            },
            isDesktop(){
                return window.matchMedia('(min-width: 420px)').matches;
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
        .bot-container {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        .bot-img {
            max-width: 40px;
            max-height: 40px;
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
    }

</style>