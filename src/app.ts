import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import router from './router'
import App from './App.vue'

require('es6-promise').polyfill()
require('fastclick').attach(document.body)

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {

  }
})

store.registerModule('vux', {
  state: {
    isLoading: false,
    direction: 'forword'
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {

  }
})

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount: number =
  (history.getItem('history_count') as any as number) * 1 || 2
history.setItem('/', String(0))
history.setItem('/demo', String(1))
history.setItem('/person', String(2))

router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', { isLoading: true })

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    // 如果没有来源，或者路由目标比来源的历史数大，或者目标和来源都是0，则视为路由前进，否则为路由回退
    // 比如来源存在且来源大于目标的历史数，则视为回退。由于根路由为0，因此所有目标为根路由的情况都是回退，除非来源也是根路由
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', { direction: 'forward' })
    } else {
      store.commit('updateDirection', { direction: 'reverse' })
    }
  } else {
    // 如果目标从来没有出现过，则必然是回退，且历史数+1
    history.setItem('history_count', String(++historyCount))
    to.path !== '/' && history.setItem(to.path, String(historyCount))
    store.commit('updateDirection', { direction: 'forward' })
  }

  // 判断路径是否携带http前缀，如果携带则使用window.location，否则继续路由
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(to => {
  document.title = to.meta.title
  store.commit('updateLoadingStatus', { isLoading: false })
})

/* eslint-disable no-new */
// new Vue(Vue.util.extend({ el: '#root', router }, App))
new Vue({ router, store, render: h => h(App) }).$mount('#root')
