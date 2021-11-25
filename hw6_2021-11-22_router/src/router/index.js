import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainMenu from "../components/MainMenu";
import PrevNextNav from '../components/PrevNextNav'
import ideas from './ideas'
import posts from './posts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    show: true,
    components: {
      default: Home,
      menu: MainMenu,
      nextPrev: PrevNextNav
    }
  },
  {
    path: '/about',
    name: 'About',
    show: true,
    components: {
      default: () => import('../views/About.vue'),
      menu: MainMenu,
      nextPrev: PrevNextNav
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    show: true,
    components: {
      default: () => import('../views/Contacts.vue'),
      menu: MainMenu,
      nextPrev: PrevNextNav
    }
  },
  ...ideas,
  ...posts,
  {
    path: '*',
    show: false,
    components: {
      default: () => import('../views/Page404.vue'),
      menu: MainMenu,
      nextPrev: PrevNextNav
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router