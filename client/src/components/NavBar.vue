<template>
    <div class="topnav">
        <div class="logoPlaceholder">Logo</div>
        <div id="myLinks" v-if="activate === true">
            <div @click="showMenu"><router-link to="/">Home</router-link></div>
            <div @click="showMenu"><router-link to="/about">About</router-link></div>
            <div @click="showMenu"><router-link to="/bots">Bots</router-link></div>
        </div>
        <a href="javascript:void(0);" class="icon" @click="showMenu"><i class="fa fa-bars"></i></a>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return{
                activate : false
            }
        },
        methods:{
            showMenu: function(){
                    console.log("hej");
                this.activate = !this.activate;
                console.log(this.activate)

            }
        }
    }
</script>

<style scoped>




</style>
