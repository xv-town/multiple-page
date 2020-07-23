import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { name, passid } from '../../project.config.json'

import ViewNotFound from '@/components/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home.async" */ '../views/Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about.async" */ '../views/About'),
    meta: { user: false }
  },
  {
    path: '*',
    name: '404',
    component: ViewNotFound,
    meta: {}
  }
]
const base = `${passid ? '/' + passid : ''}/${name}`;
const router = new VueRouter({
  mode: 'history',
  base,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.user && !store.state.user.baseInfo) {
    store.dispatch('getUserBaseInfo')
  }
  // 登录校验
  next()
})

export default router
