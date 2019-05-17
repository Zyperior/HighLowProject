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

        .logoPlaceholder{
                display: block;
        }

        /* Style the navigation menu */
        .topnav {
                overflow: hidden;
                position: absolute;
                background-color: #333;
                left: 0;
                top: 0;
                z-index: 1;
        }

        /* Hide the links inside the navigation menu (except for logo/home) */
        .topnav #myLinks {
                display: block;
        }

        /* Style navigation menu links */
        .topnav a {
                color: white;
                text-decoration: none;
                display: block;
        }

        /* Style the hamburger menu */
        .topnav a.icon {
                background: black;
                display: block;
                position: absolute;
                right: 0;
                top: 0;
        }

        /* Add a grey background color on mouse-over */
        .topnav a:hover {
                background-color: #ddd;
                color: black;
        }


</style>
