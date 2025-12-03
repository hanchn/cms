import { createRouter, createWebHistory } from 'vue-router'
import { createAutoRoutes } from './auto'

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