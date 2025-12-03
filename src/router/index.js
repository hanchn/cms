import { createRouter, createWebHistory } from 'vue-router'
import { createAutoRoutes } from '@utils/auto-routes'
import Login from '@layouts/Login/Index.vue'
import { useAuthStore } from '@stores/auth'

const pages = createAutoRoutes()
const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', redirect: pages.length ? pages[0].path : '/' },
  ...pages
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const auth = useAuthStore()
  auth.loggedIn = !!token
  if (!token && to.path !== '/login') return '/login'
  if (token && to.path === '/login') return '/'
})

export default router