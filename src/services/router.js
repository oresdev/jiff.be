import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
  { path: '/about', name: 'about', component: About },
  { path: '/manage', name: 'manage', component: Manage },
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router