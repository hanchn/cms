<template>
  <a-menu theme="dark" mode="inline" :selectedKeys="[selectedKey]" :openKeys="openKeys" class="side-menu">
    <template v-for="item in items">
      <a-sub-menu v-if="item.children && item.children.length" :key="item.key" class="submenu">
        <template #title>
          <span class="submenu-title">{{ item.title }}</span>
        </template>
        <a-menu-item v-for="c in item.children" :key="c.key" class="child-item">
          <RouterLink :to="c.path">{{ c.title }}</RouterLink>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.key" class="root-item">
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

const items = ref([])
const route = useRoute()
const router = useRouter()
const store = useLayoutStore()

const selectedKey = computed(() => route.name || '')
const openKeys = computed(() => {
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

<style scoped>
.side-menu :deep(.ant-menu-submenu-title) { padding-left: 12px; }
.submenu-title { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: #e5e7eb; border-left: 3px solid #22d3ee; padding-left: 8px; }
.child-item :deep(.ant-menu-title-content) { padding-left: 4px; }
.root-item :deep(.ant-menu-title-content) { font-weight: 500; }
</style>