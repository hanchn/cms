<template>
  <a-menu theme="dark" mode="inline" :selectedKeys="[selectedKey]" :openKeys="openKeys" :inline-collapsed="collapsed">
    <template v-for="item in items">
      <a-sub-menu v-if="item.children && item.children.length" :key="item.key">
        <template #title>{{ item.title }}</template>
        <a-menu-item v-for="c in item.children" :key="c.key">
          <RouterLink :to="c.path">{{ c.title }}</RouterLink>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.key">
        <RouterLink :to="item.path">{{ item.title }}</RouterLink>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNav } from '@apis/nav'
import { useLayoutStore } from '@stores/layout'
const props = defineProps({ collapsed: { type: Boolean, default: false } })

const items = ref([])
const route = useRoute()
const router = useRouter()
const store = useLayoutStore()

const selectedKey = computed(() => route.name || '')
const openKeys = computed(() => {
  if (props.collapsed) return []
  const name = route.name || ''
  const parent = items.value.find(i => i.children && i.children.some(c => c.key === name))
  return parent ? [parent.key] : []
})

onMounted(async () => {
  const nav = await getNav()
  store.setNav(nav)
  const routes = router.getRoutes()
  const match = (p) => routes.some(r => r.path === p)
  items.value = nav.map(n => {
    if (n.children && n.children.length) {
      const children = n.children.filter(c => match(c.path))
      return { ...n, children }
    }
    return n
  }).filter(n => (n.children && n.children.length) || (n.path && match(n.path)))
})
</script>