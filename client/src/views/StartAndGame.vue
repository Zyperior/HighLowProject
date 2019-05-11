<template>
    <div>
        <start/>
        <game/>
    </div>
</template>

<script>
    import Start from "../components/Start"
    import Game from "../components/Game";

    export default {
        name: "StartAndGame",
        components: {
            start: Start,
            game: Game
        }
    }
</script>

<style scoped>

</style>