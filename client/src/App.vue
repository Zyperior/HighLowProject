<template>
  <div id="app">
    <NavBar/>
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
          this.$store.commit("stopGame");
          this.$store.commit("breakOutOfBotLoop")
        }
      }
    },
    mounted() {
      console.log(localStorage)
      console.log(localStorage.getItem("viewAdminPages") == "true")
      this.$store.commit("updateWhichPagesThatShouldBeDisplayedToTheUser", {
        loggedInUser: false,
        admin: localStorage.getItem("viewAdminPages") == "true"
      })
    }
  }
</script>

<style>


  body {
    margin: 0px;
    background-color: var(--backGroundColor);
    box-sizing: border-box;
  }

  #app {
    font-family: var(--fonts);
    color: var(--defaultFontColor);
    text-align: center;
    font-size: var(--defaultFontSizeMobile);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: var(--fonts);
    color: var(--defaultFontColor);
    background-color: var(--buttonColor);
    width: 80%;
    font-size: var(--defaultFontSizeMobile);
    padding: 1em;
    border-radius: 1em;
    border-style: outset;
    border-width: 8px;
    border-color: var(--buttonBorderColor);
    margin: 1em 1em 0em 1em;
  }

  @media (min-width: 768px) {

    #app {
      font-size: var(--defaultFontSize);
    }

    button {
      font-size: var(--defaultFontSize);
      width: 20%;
    }


  }
</style>
