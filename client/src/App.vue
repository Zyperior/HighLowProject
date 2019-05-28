<template>
  <div> <!--id="app"-->
    <NavBar/> <!--class="topnav"-->
    <router-view class="view"/> <!--class="view"-->
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
           this.$store.commit('userStats/setIsLoggedIn', true)
       }
    }
  }
</script>

<style>

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*.logoPlaceholder{*/
  /*  display: block;*/
  /*  color: white;*/
  /*}*/
  /*.view{*/
  /*  margin-top: 40px;*/
  /*}*/
  /*!* Style the navigation menu *!*/
  /*.topnav {*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  min-width: 100%;*/
  /*  left: 0;*/
  /*  top: 0;*/
  /*}*/

  /*#topnav{*/
  /*  background-color: #333;*/
  /*}*/

  /*!* Hide the links inside the navigation menu (except for logo/home) *!*/
  /*.topnav #myLinks {*/
  /*  display: block;*/
  /*}*/
  /*!* Style navigation menu links *!*/
  /*.topnav a {*/
  /*  color: white;*/
  /*  text-decoration: none;*/
  /*  display: block;*/

  /*}*/

  /*!* Style the hamburger menu *!*/
  /*.topnav a.icon {*/
  /*  background: black;*/
  /*  display: block;*/
  /*  position: absolute;*/
  /*  right: 0;*/
  /*  top: 0;*/
  /*  width: 35px;*/
  /*  height: 35px;*/
  /*}*/

  /*!* Add a grey background color on mouse-over *!*/
  /*.topnav a:hover {*/
  /*  background-color: #ddd;*/
  /*  color: black;*/
  /*}*/

  /*body {*/
  /*  !*margin: 0.5em;*!*/
  /*  background-color: var(--backGroundColor);*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*#app {*/
  /*  font-family: var(--fonts);*/
  /*  color: var(--defaultFontColor);*/
  /*  text-align: center;*/
  /*  font-size: var(--defaultFontSizeMobile);*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*}*/

  /*button {*/
  /*  font-family: var(--fonts);*/
  /*  color: var(--defaultFontColor);*/
  /*  background-color: var(--buttonColor);*/
  /*  width: 80%;*/
  /*  font-size: var(--defaultFontSizeMobile);*/
  /*  padding: 1em;*/
  /*  margin: 1em 1em 0em 1em;*/
  /*}*/

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
