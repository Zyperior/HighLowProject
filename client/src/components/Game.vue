<template>
    <div>
        <div v-if="isGameRunning">
            <QuestionCard />
            <div>
                <div class="aboveBelow">
                    <div>Closest above:</div><div>{{highGuess}}</div>
                    <div>Closest below:</div><div>{{lowGuess}}</div>
                </div>

                <div id="playerCardsDiv">
                    <PlayerCards :active-players="players" ref="myPlayerCards"></PlayerCards>
                </div>

                <input v-model="answer"
                       oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')"
                       name="answer"
                       placeholder="Enter your answer"
                       :disabled="!activePlayer.isHuman"
                       autocomplete="off"
                       v-on:keydown.enter="submitAnswerWithEnter(answer)"/>

                <div>
                    <button @click="submitAnswer(answer)"
                            :disabled="!activePlayer.isHuman || answer.length === 0"
                            :class="{buttonDisabled: !activePlayer.isHuman || answer.length === 0}">Submit Answer
                    </button>
                    <button v-if="speechRecognitionAvailable"
                            @click="startVoiceRecording"
                            :disabled="!activePlayer.isHuman"
                            :class="{buttonDisabled: !activePlayer.isHuman}">Click To Talk
                    </button>
                </div>
                <HigherLowerFeedBack class="high-or-low" v-if="showHiLo" />
                <chat-message />
                <Timer ref="myTimer" />
            </div>
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
                recording: false,
                answer: '',
                speechRecognitionAvailable: window.hasOwnProperty('webkitSpeechRecognition'),
                showHiLo: false,
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
            muteSounds(){
                return this.$store.getters.isMuteSound;
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

            activePlayer : function(){

                const game = this;

                game.$refs.myTimer.stopTimer();

                setTimeout(function() {

                    game.$refs.myTimer.startTimer();

                    if(!game.activePlayer.isHuman){
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

                    if(this.$store.state.game.chattyBots) {
                        // noinspection JSIgnoredPromiseFromCall
                        this.$store.dispatch("chat", answer);
                    }
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
                this.showHiLo = true;
                setTimeout(() => {
                    this.showHiLo = false;
                }, 1500);
            },

            submitAnswerWithEnter(answer) {

                if (answer.length !== 0) {
                    this.submitAnswer(answer);
                }

            },

            startVoiceRecording() {
                //Starts recording if player turn and not currently recording, when recording stops submit if it's still the player turn.
                if (this.activePlayer.isHuman) {
                    let game = this;
                    let voiceResult = 0;
                    recognition.lang = getCurrentSettings().micInputLanguage;
                    if(!game.recording) {
                        recognition.start();
                        game.recording = true;
                        recognition.onresult = function (event) {
                            for (let i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                    voiceResult = event.results[i][0].transcript;
                                    if (game.activePlayer.isHuman) {
                                        game.submitAnswer(voiceResult);
                                    }
                                }
                            }
                        };
                    }
                    recognition.onend = function() {
                        this.recording = false;
                    };
                }
            },
        },
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

    .activePlayer {
        background-color: red;
    }

    #playerCardsDiv {
        width: 84vw;
        height: 80vw;
        margin: auto;
        text-align: center;
    }


    .buttonDisabled{
      opacity: 0.6;
      cursor: not-allowed;
    }

    .aboveBelow{
        display: grid;
        grid-template-columns: 31% 19% 31% 19%;
        font-size: 15px;
        text-align: start;
    }

    .high-or-low{
        position: absolute;
        left: 25%;
        top: 43%;
        font-weight: 800;
        font-size: 20px;
    }

    @media (min-width: 768px) {

        #playerCardsDiv {
            width: 21vw;
            height: 32vw;
        }

    }


</style>
