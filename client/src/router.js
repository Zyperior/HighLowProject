import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)



const router = new Router({
  routes: [
      {
        path: '/error',
        name: 'error-page',
        component: () => import('./components/error/error.vue')
      },
    {
      path: '/',
      name: 'home',
      component: () => import("./components/Start")
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import("./components/Rules")
    },
    {
      path: '/game',
      name: 'game',
      component: () => import("./components/Game")
    },
    {
      path: '/complete',
      name: "GameComplete",
      component: () => import('./views/GameComplete.vue')
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
      path: '/register',
      name: 'register',
      component: () => import('./components/login/Register.vue')
    },



    {
      path: '/auth-test',
      name: 'authtest',
      component: () => import('./components/login/AuthenticationTest.vue')
    },
    {
      path: '/profile/:username',
      name: 'user-profile',
      component: () => import('./views/UserProfile.vue'),
      props: true
    },
    {
        path: '/myprofile',
        name: 'my-profile',
        beforeEnter: (to, from, next) => {
          next('/profile/'+window.$cookies.get('userData').username)
    },
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  const pagesThatRequireLogin = ["/profile", "/suggest-question", "/admin"];
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

