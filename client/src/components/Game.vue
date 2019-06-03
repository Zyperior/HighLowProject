<template>
    <div>
        <div class="gameView" v-if="isGameRunning">

            <QuestionCard>
                <HigherLowerFeedBack id="feedback" slot="feedback" v-if="showHiOrLow" />
                <Timer id="timer" slot="timer" ref="myTimer"/>
            </QuestionCard>

            <div class="answerGrid">

                <div class="aboveBelowGrid">
                    Less than:
                    <div class="aboveBelowValue">{{highGuess}}</div>
                </div>

                <input v-model="answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')"
                       name="answer" placeholder="Enter your answer" :disabled="!activePlayer.isHuman"
                       autocomplete="off" v-on:keydown.enter="submitAnswerWithEnter(answer)"/>

                <div class="aboveBelowGrid">
                    More than:
                    <div class="aboveBelowValue">{{lowGuess}}</div>
                </div>

            </div>

            <div class="buttonGrid">
                <div class="submitButton"
                        @click="submitAnswer(answer)"
                        :disabled="!activePlayer.isHuman || answer.length === 0"
                        :class="{buttonDisabled: !activePlayer.isHuman || answer.length === 0}">Submit answer
                </div>
                <img    class="pushToTalk"
                        src="../assets/PTT.svg"
                        v-if="speechRecognitionAvailable"
                        @click="startVoiceRecording"
                        :disabled="!activePlayer.isHuman"
                        :class="{buttonDisabled: !activePlayer.isHuman}"
                />
            </div>


            <div id="playerCardsDiv">
                <PlayerCards :active-players="players" ref="myPlayerCards"></PlayerCards>
            </div>

            <chat-message />
        </div>
        <div v-else>

        </div>
    </div>

</template>
<script>
    import Timer from './Timer.vue';
    import ChatMessage from "./ChatMessage";
    import PlayerCards from './PlayerCards.vue';
    import {getCurrentSettings} from '../modules/settingsData';
    import QuestionCard from './questioncard/QuestionCard';
    import HigherLowerFeedBack from './game/HigherLowerFeedBack'

    //Some voice recognition.
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();
    }

    export default {
        name: 'Game',
        components: {
            ChatMessage,
            Timer,
            PlayerCards,
            QuestionCard,
            HigherLowerFeedBack
        },
        data(){
            return {
                number: 0,
                recognizing: false,
                answer: '',
                speechRecognitionAvailable: window.hasOwnProperty('webkitSpeechRecognition'),
                showHiOrLow: false,
            }
        },
        computed: {
            isGameRunning(){
              return this.$store.getters.isGameRunning;
            },
            lastGuess() {
              return this.$store.getters.getLastGuess;
            },
            startTimer() {
                return this.$store.getters.isStartTimer;
            },
            lowGuess() {
                return this.$store.getters.getLowGuess;
            },
            highGuess() {
                return this.$store.getters.getHighGuess;
            },
            players(){
                return this.$store.getters.getPlayers;
            },
            activePlayer(){
                return this.$store.getters.getActivePlayer;
            },
            correctAnswer(){
                return this.$store.getters.getCorrectAnswer;
            },
            isTimerZero(){
                return this.$store.getters.getIsTimerZero;
            },
            animationTime() {
                return this.$store.getters.getAnimationTime;
            },
            botLoopTimeoutFunction: {
                get(){
                    return this.$store.getters.getBotLoopTimeoutFunction;
                },
                set(timeoutFunction){
                    this.$store.commit("setBotTimeoutFunction", timeoutFunction)
                }
            },

        },
        watch: {
            //Executes first guess if starting player is Bot
            isGameRunning : function(){

                if(this.isGameRunning && !this.activePlayer.isHuman){
                    this.botGuess();
                }

            },

            //Checks if it's the players turn, if not the bot will send it's guess after the card animation
            //has been played out
            activePlayer : function(){

                const game = this;
                game.$refs.myTimer.stopTimer();

                setTimeout(function () {

                    if(game.isGameRunning) {
                        game.$refs.myTimer.startTimer();
                    }
                    if (!game.activePlayer.isHuman) {
                            game.botGuess();
                    }

                }, game.animationTime);

            },

            isTimerZero(){
                this.submitAnswer(-1);
            }
        },
        methods: {

            submitAnswer(answer) {

                if(this.isGameRunning){
                    this.showFeedback();
                    this.$store.dispatch("submitAnswer", answer).then(()=>{
                        this.showFeedback();
                    });
                }

                this.answer = "";

            },

            botGuess(){

                const game = this;

                if(game.isGameRunning){
                    let guessTime = (Math.ceil(Math.random() * 5)) * 1000; //Bot takes between 1-5 seconds to guess

                    game.botLoopTimeoutFunction = setTimeout(function () {

                        game.activePlayer.guess().then((answer) =>{ //Returns a guess based on the interval-object

                            game.$store.dispatch("submitAnswer", answer).then(()=>{
                                game.showFeedback();
                            });
                        });

                    }, guessTime)
                }
            },

            showFeedback() {
                //Timeout for "Higher!" "Lower!" messages.
                this.showHiOrLow = true;
                setTimeout(() => {
                    this.showHiOrLow = false;
                }, 1500);
            },

            submitAnswerWithEnter(answer) {

                if (answer.length !== 0) {
                    this.submitAnswer(answer);
                }

            },

            startVoiceRecording() {
                //Starts recording if player turn and not currently recording,
                //when recording stops submit if it's still the player turn.
                if (this.activePlayer.isHuman) {
                    let game = this;
                    let voiceResult = 0;
                    recognition.lang = getCurrentSettings().micInputLanguage;

                    if (!game.$store.state.recognizing) {
                        recognition.start();
                        recognition.onresult = function (event) {
                            for (let i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                    voiceResult = event.results[i][0].transcript;
                                    if (game.activePlayer.isHuman && Number.isInteger(Number.parseInt(voiceResult))) {
                                        game.submitAnswer(voiceResult);
                                    }
                                }
                            }
                        };
                    }
                    recognition.onstart = function (event) {
                        game.$store.state.recognizing = true;
                    };
                    recognition.onend = function (event) {
                        game.$store.state.recognizing = false;
                    };
                    recognition.onerror= function(event) {
                        game.$store.state.recognizing = false;
                    }
                }
            },
        },
        //If re-routed/refreshed stop the game and timer
        beforeRouteLeave: (to, from, next) => {
            next(vm => {
                vm.$store.commit('stopTimer');
                vm.$store.commit('stopGame');
            })
        }
    }
</script>
<style scoped>

    * {
        box-sizing: border-box;
    }

    .gameView{
        display: grid;
        justify-items: center;
        padding: 3px;
    }

    .activePlayer {
        background-color: red;
    }

    .buttonDisabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .high-or-low{
        position: absolute;
        left: 25%;
        top: 43%;
        font-weight: 800;
        font-size: 20px;
    }

    .answerGrid{
        display: grid;
        min-width: 80%;
    }

    .aboveBelowGrid{
        display: grid;
        grid-template-columns: 25% auto;
        font-size: 12px;
        text-align: start;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    input{
        font-size: 20px;
    }

    .buttonGrid{
        display: grid;
        width: 295.35px;
        grid-template-columns: auto fit-content(10vmin);
        margin-bottom: 20px;
    }

    .submitButton{
        display: grid;
        height: 40px;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-family: var(--fonts);
        color: var(--defaultFontColor);
        background-color: var(--buttonColor);
        border-width: 2px;
        border-style: outset;
        border-color: buttonface;
        border-image: initial;
    }

    .pushToTalk{
        width: 40px;
        padding: 2px;
        border: solid #ADD8E6
    }

    @media (max-width: 767px) {

        #playerCardsDiv {
            width: 84vw;
            height: 80vw;
            margin: auto;
            text-align: center;
        }

    }


    @media (min-width: 768px) {

        #playerCardsDiv {
            width: 31.5vw;
            height: 30vw;
            margin: auto;
            text-align: center;
        }

    }


</style>
