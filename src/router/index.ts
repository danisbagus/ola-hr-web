import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/homeView.vue'
      import LoginView from '@/views/loginView.vue'

const routers = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routers
})

export default router;