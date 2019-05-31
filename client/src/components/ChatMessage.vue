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
                    <p class="messenger-name">{{message.name}}</p>
                    <p class="message">{{message.text}}</p>
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
        left: 25%;
        color: whitesmoke;
        top: 0;
        width: 50%;
        transition: height 0.2s;
    }

    .message-container {
        background: rgba(0,0,0,.6);
        border-radius: 20px;
        display: grid;
        grid-template-columns: 40% 60%;
    }

    .messenger-name {
        font-weight: 600;
        padding-top: 10px;
    }

    img{
        max-width: 100%;
        align-self: center;
    }

    .message {
        padding: 10px;
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
