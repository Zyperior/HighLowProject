<template>
    <div class="about">
        <div class="title">About High/Low Project</div>
        <div class="info">
            This is a school project for
            IT-Högskolan.
            It covers two parallel classes:
            &#8226; Agile-Methods
            &#8226; Web-Applications
            This project focuses on SCRUM and Vue.
            
            Team-members (link to Github):

            <div><a href="https://github.com/Zyperior" target="_blank">Andreas Albihn</a></div>
            <div><a href="https://github.com/Bagenholm" target="_blank">Patrik Bågenholm</a></div>
            <div><a href="https://github.com/IdaFagerlund" target="_blank">Ida Fagerlund</a></div>
            <div><a href="https://github.com/Borgersen84" target="_blank">Öyvind Borgersen</a></div>
            <div><a href="https://github.com/DaniellaNoren" target="_blank">Daniella Norén</a></div>
            <div><a href="https://github.com/ChristoffersonFilip" target="_blank">Filip Christofferson</a></div>
            <div><a href="https://github.com/daniel-bjornberger" target="_blank">Daniel Björnberger</a></div>
        </div>

        <div class="statsTitle">
            <hr>
            General Statistics:
        </div>

        <general-stats class="generalStats stats"/>
        <hr>
        <top-users></top-users>
        <div>
            <hr>
        </div>

    </div>
</template>


<script>

    import GeneralStats from '../components/GeneralStats'
    import TopUsers from '../components/TopUsers'

    export default {
        name: "About",
        components:{
            'general-stats' : GeneralStats,
            'top-users': TopUsers
        }
    }

</script>

<style scoped>
    .about{
        display:grid;
        grid-template-columns: repeat(1, auto);
        grid-template-rows: repeat(3, auto);
        /* min-width: 96vmin; */
        justify-content: center;
        margin: 1em;
        padding: 0px 15px 0px 15px
    }

    .title {
        text-decoration: underline;
        grid-row: 1;
        grid-column: 1;

    }

    .info{
        text-align: left;
        margin-top: 1vmax;
        white-space: pre-line;
    }

    .statsTitle{
        margin-top: 2em;
    }

    .generalStats{
        display:grid;
        margin-top: 1vmax;
        min-width: 60%;
        grid-template-columns: auto auto;
        justify-self: center;
        justify-items: center;
    }

</style>

