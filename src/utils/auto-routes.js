import AdminLayout from '@layouts/Admin/Index.vue'
import { useLayoutStore } from '@stores/layout'
import { h } from 'vue'

function withLayout(Page, name) {
  return {
    name: `${name}WithLayout`,
    setup() {
      const store = useLayoutStore()
      return () => store.enabled && !store.noLayoutPages.includes(name)
        ? h(AdminLayout, null, { default: () => h(Page) })
        : h(Page)
    }
  }
}

export function createAutoRoutes() {
  const modules = import.meta.glob('../views/**/{Index,Main}.vue', { eager: true })
  return Object.entries(modules).map(([key, mod]) => {
    const parts = key.split('/'); const i = parts.indexOf('views'); const folder = parts[i + 1]
    return { path: `/${folder.toLowerCase()}`, name: folder, component: withLayout(mod.default, folder) }
  }).sort((a, b) => a.path.localeCompare(b.path))
}