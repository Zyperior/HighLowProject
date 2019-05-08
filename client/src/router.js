import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './components/Game.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: Game
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import('./components/Rules.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
