import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/Home.vue'
const Error404 = () => import('./error/404.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '主页'
      }
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
