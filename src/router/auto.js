import AdminLayout from '../layouts/AdminLayout.vue'
import { h } from 'vue'

function withLayout(Page) {
  return { render() { return h(AdminLayout, null, { default: () => h(Page) }) } }
}

export function createAutoRoutes() {
  const modules = import.meta.glob('../views/**/{Index,Main}.vue', { eager: true })
  return Object.entries(modules).map(([key, mod]) => {
    const parts = key.split('/')
    const i = parts.indexOf('views')
    const folder = parts[i + 1]
    return { path: `/${folder.toLowerCase()}`, name: folder, component: withLayout(mod.default) }
  }).sort((a, b) => a.path.localeCompare(b.path))
}