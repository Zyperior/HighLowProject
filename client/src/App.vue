
<template>
  <div id="app">
    <NavBar class="topnav"/>
    <router-view/>
  </div>
</template>
<script>
  import NavBar from "./components/NavBar"
  export default {
    name: "app",
    components:{
      NavBar,
    },
    watch: {
      $route(to, from){
        if(from.name === "game"){
          this.$store.commit("stopGame")
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* Style the navigation menu */
.topnav {
  width: 100%;
  min-height: 7vh;
}


.topnav .logoPlaceholder{
  margin-top: 1.9vh;
}

.topnav a{
  padding: 14px 16px;
}




</style>

