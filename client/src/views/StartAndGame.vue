<template>
    <div>
        <start/>
        <game/>
    </div>
</template>

<script>
    import start from "../components/Start"
    import game from "../components/Game";

    export default {
        name: "StartAndGame",
        components: {
            start,
            game
        }
    }
</script>

<style scoped>

</style>