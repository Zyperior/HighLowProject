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
    }
  }
</script>

<style>

  body {
    margin: 0px;
    background-color: honeydew;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    color: darkblue;
    text-align: center;
    font-size: 5vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    color: darkblue;
    background-color: bisque;
    width: 80%;
    font-size: 5vw;
    padding: 1em;
    border-radius: 1em;
    border-style: outset;
    border-width: 8px;
    border-color: beige;
    margin: 1em 1em 0em 1em;
  }
</style>
