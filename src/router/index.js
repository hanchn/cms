import { createRouter, createWebHistory } from 'vue-router'
import { createAutoRoutes } from '@utils/auto-routes'

const pages = createAutoRoutes()
const routes = [
  { path: '/', redirect: pages.length ? pages[0].path : '/' },
  ...pages
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router