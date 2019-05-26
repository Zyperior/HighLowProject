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
      path: '/profile',
      name: 'profile',
      component: () => import('./components/login/Profile.vue')
    },
      {
          path: '/suggest-question',
          name: 'suggest-question',
          component: () => import('./components/login/SuggestQuestion.vue')
      },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./components/login/AdminPage.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  const pagesThatRequireLogin = ["/profile", "/admin"];
  const adminPages = ["/admin"];

  const loginRequired = pagesThatRequireLogin.includes(to.path);
  const adminRequired = adminPages.includes(to.path);

  if(to.path === "/login" && localStorage.getItem("token")){
    return next("/")
  }

  if(!localStorage.getItem("token") && loginRequired){
    return next("/login");
  }
  else if(adminRequired && localStorage.getItem("viewAdminPages") != "true"){
    return next("/login");
  }
  next();

});

export default router;
