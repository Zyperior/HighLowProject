<template>
  <div id="app">
    <NavBar/>
    <router-view class="view"/>
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
          this.$store.commit("stopGame");
          this.$store.commit("breakOutOfBotLoop")
        }
      }
    },
    mounted() {
      this.$store.commit("updateWhichPagesThatShouldBeVisibleToTheUser", {
        loggedInUser: localStorage.getItem("token"),
        admin: localStorage.getItem("viewAdminPages") == "true"
      })
       if(window.$cookies.isKey('userData')) {
           this.$store.commit('userDB/setIsLoggedIn', true)
       }
    }
  }
</script>

<style>

  @import './assets/css/style.css';

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  p{
    padding: 1em;
  }


  .view{
    margin-top: 15px;
  }


  body {
    /*margin: 0.5em;*/
    background-color: var(--backGroundColor);
    box-sizing: border-box;
  }


  #app {
    font-family: var(--fonts);
    color: var(--defaultFontColor);
    text-align: center;
    /*font-size: var(--defaultFontSizeMobile);*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: var(--fonts);
    color: var(--defaultFontColor);
    background-color: var(--buttonColor);
    padding: 1em 8em;
    /*width: 80%;*/
    /*font-size: var(--defaultFontSizeMobile);*/
    /*padding: 1em;*/
    /*margin: 1em 1em 0em 1em;*/
  }

  /*@media (min-width: 768px) {*/

  /*  #app {*/
  /*    font-size: var(--defaultFontSize);*/
  /*  }*/

  /*  button {*/
  /*    font-size: var(--defaultFontSize);*/
  /*    width: 20%;*/
  /*  }*/
  /*}*/

</style>
