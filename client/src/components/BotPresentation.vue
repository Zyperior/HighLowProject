<template>
    <div>
        {{bot}}
    </div>

</template>

<script>
    export default {
        name: "BotPresentation",
        props: {
            bot: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>