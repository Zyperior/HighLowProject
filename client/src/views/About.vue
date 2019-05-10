<template>
    <div class="about">
        <h1>General stats</h1>
        <general-stats class="generalStats"/>
    </div>
</template>

<script>
    import GeneralStats from '../components/GeneralStats'

    export default {
        name: "About",
        components:{
            'general-stats' : GeneralStats
        }
    }
</script>

<style scoped>
    .generalStats{
        display:grid;
    }
</style>
