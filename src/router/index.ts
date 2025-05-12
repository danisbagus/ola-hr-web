import { createRouter, createWebHistory } from 'vue-router'
import { HOME_URL } from '@/config'
import HomeView from '@/views/homeView.vue'
import LoginView from '@/views/login/index.vue'
import LayoutView from '@/layouts/index.vue'

const constantRoutes = [
  {
    path: '/',
    redirect: HOME_URL
    // redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutView,
    redirect: HOME_URL,
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
