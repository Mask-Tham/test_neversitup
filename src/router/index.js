import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/todolist'
  },
  {
    path: '/home',
    name: 'home',
    component:Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta:{
      layout:'blank',
      resource:'Public'

    }
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('../views/TodoList.vue'),
  },
  {
    path: '/bonus',
    name: 'bonus',
    component: () => import('../views/bonusPoint.vue'),
    meta:{
      resource:'Public'

    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {

  const accessToken = Vue.$cookies.get('accessToken')

  if (to.meta.resource != 'Public') {
    // is login
    if (accessToken) {  
      return next()
    }
    // not login return to login
    return next({name:'login'})
  }

 return next()
})

export default router
