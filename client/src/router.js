import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios"

Vue.use(Router)



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
      component: () => import('./components/login/Login.vue')
    },



    {
      path: '/auth-test',
      name: 'authtest',
      component: () => import('./components/login/AuthenticationTest.vue')
    },
    {
      path: '/secret-page',
      name: 'secret-page',
      component: () => import('./components/login/OnlyLoggedInCanSeeThis.vue')
    },
    {
      path: '/super-secret-page',
      name: 'super-secret-page',
      component: () => import('./components/login/OnlyLoggedInAdminCanSeeThis.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  const pagesThatRequireLogin = ["/secret-page", "/super-secret-page"];
  const adminPages = ["/super-secret-page"];

  const loginRequired = pagesThatRequireLogin.includes(to.path);
  const adminRequired = adminPages.includes(to.path);

  if(!localStorage.getItem("token") && loginRequired){
    return next("/login");
  }
  else if(adminRequired && localStorage.getItem("viewAdminPages") != "true"){
    return next("/login");
  }
  next();

});

export default router;
