import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainMenu from "../components/MainMenu";
import ideas from './ideas'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    show: true,
    components: {
      default: Home,
      menu: MainMenu
    }
  },
  {
    path: '/about',
    name: 'About',
    show: true,
    components: {
      default: () => import('../views/About.vue'),
      menu: MainMenu
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    show: true,
    components: {
      default: () => import('../views/Contacts.vue'),
      menu: MainMenu
    }
  },
  // {
  //   path: '/list-of-ideas',
  //   name: 'List of Ideas',
  //   components: {
  //     default: () => import('../views/ListOfIdeas.vue'),
  //     menu: MainMenu
  //   }
  // },
  ...ideas,
  {
    path: '*',
    show: false,
    components: {
      default: () => import('../views/Page404.vue'),
      menu: MainMenu
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
