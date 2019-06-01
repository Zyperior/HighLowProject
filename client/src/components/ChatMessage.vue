<template>
    <div class="message-area">
        <transition-group>
            <div v-if="showMessage"
                 v-for="(message, index) in messages"
                 :message="messages[index]"
                 :key="index"
                 class="message-container">
                <img :src="message.img">
                <div>
                    <div class="messenger-name">{{message.name}}</div>
                    <div class="message">{{message.text}}</div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>

    export default {
        name: "ChatMessage",
        data: function () {
            return {
                showMessage: true,
            }
        },
        computed: {
            messages() {
                return this.$store.state.chat.messages;
            }
        },
    }

</script>

<style scoped>

    .message-area {
        position: absolute;
        color: whitesmoke;
        bottom: 0;
        transition: height 0.2s;
        align-self: center;
        padding-left: 25%;
        padding-right: 25%;
    }

    .message-container {
        background: rgba(0,0,0,.6);
        border-radius: 20px;
        display: grid;
        grid-template-columns: 30% 70%;
    }

    .messenger-name {
        font-weight: 600;
        padding-top: 5px;
    }

    img{
        max-width: 80%;
        align-self: center;
        border-radius: 100%;
    }

    .message {
        padding: 5px;
    }
    .v-enter-active {
        animation: expand-bounce 0.3s;
    }

    .v-leave-active {
        animation: expand-bounce 0.2s reverse;
    }

    @keyframes expand-bounce {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }

</style>
