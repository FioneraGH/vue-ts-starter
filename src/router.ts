import Vue from 'vue'
import Router from 'vue-router'
import Error404 from './error/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('./pages/Home.vue').default,
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
