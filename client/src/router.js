import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios"

Vue.use(Router)

//before changing:
//export default new Router({

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("./components/Start")
    },
    {
      path: '/game',
      name: 'game',
      component: () => import("./components/Game")
    },
    {
      path: '/complete',
      name: "GameComplete",
      component: () => import('./components/GameComplete.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/bots',
      name: 'botPresentation',
      component: () => import('./views/BotsProfile.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/secret-page',
      name: 'secret-page',
      component: () => import('./components/OnlyLoggedInCanSeeThis.vue')
    },
    {
      path: '/super-secret-page',
      name: 'super-secret-page',
      component: () => import('./components/OnlyLoggedInAdminCanSeeThis.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

   const pagesThatRequireLoggedIn = ["/secret-page"];
   const authRequired = pagesThatRequireLoggedIn.includes(to.path);

   const adminOnlyPages = ["/super-secret-page"];
   const adminRequired = adminOnlyPages.includes(to.path);



  axios.get("http://localhost:5000/users/testauth2", {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`
    }
  })
  .then((response) => {

    if(authRequired && !response.data.isLoggedIn){
      return next("/login")
    }
    next();
  })
  .catch((error) => console.log(error));





});

export default router;
