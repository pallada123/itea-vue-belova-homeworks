import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/registration',
        name: 'Registration',
        component:  () => import('../views/registration.vue')
      },
      {
        path: '/auth',
        name: 'Auth',
        component:  () => import('../views/auth.vue')
      }
    ]
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/todos.vue')
  },
  {
    path: '/todos-completed',
    name: 'Todos-completed',
    component: () => import('../views/todos-completed.vue')
  },
  {
    path: '*',
    hidden: true,
    component:  () => import('../views/page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
