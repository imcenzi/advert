import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    //component: () => import(/* webpackChunkName: "about" */ '../views/PrizeTray.vue'),
    meta: {title:'幸运大转盘'}
  },
  {
    path: '/nine',
    name: '九宫格',
    component: () => import(/* webpackChunkName: "about" */ '../views/RaffleNine.vue'),
    meta: {title:'幸运大转盘'}
  },
  {
    path: '/wheel',
    name: '转盘',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrizeTray.vue'),
    meta: {title:'幸运大转盘'}
  },
  {
    path: '/prizeList',
    name: '我的奖品',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrizeList.vue'),
    meta: {title:'幸运大转盘'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

