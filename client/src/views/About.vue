<template>
    <div class="about">
        <div class="title">About High/Low Project</div>
        <div class="info">
            This is a school project for IT-Högskolan<br>
            It covers two parallel classes:<br>
            Agile-Methods<br>
            Web-Applications<br>
            This project focuses on SCRUM and Vue.<br>
            <br>
            Team-members (link to github):<br>
            <a href="https://github.com/Zyperior" target="_blank">Andreas Albihn</a><br>
            <a href="https://github.com/Bagenholm" target="_blank">Patrik Bågenholm</a><br>
            <a href="https://github.com/IdaFagerlund" target="_blank">Ida Fagerlund</a><br>
            <a href="https://github.com/Borgersen84" target="_blank">Öyvind Borgersen</a><br>
            <a href="https://github.com/DaniellaNoren" target="_blank">Daniella Norén</a><br>
            <a href="https://github.com/ChristoffersonFilip" target="_blank">Filip Christofferson</a><br>
            <a href="https://github.com/daniel-bjornberger" target="_blank">Daniel Björnberger</a><br>
        </div>
        <div class="statsTitle"><hr>General Statistics:</div>
        <general-stats class="generalStats"/>
        <div><hr></div>
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
    .about{
        display:grid;
        min-width: 96vmin;
        justify-content: center;

    }

    .info{
        text-align: left;
        margin-top: 1vmax;
    }

    .statsTitle{
        margin-top: 50%;
    }

    .generalStats{
        display:grid;
        margin-top: 1vmax;
        min-width: 60%;
        grid-template-columns: auto auto;
        justify-self: center;
        justify-items: flex-start;
    }
</style>
