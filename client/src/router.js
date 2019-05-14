import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/start',
      name: 'start',
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
    }
  ]
})
