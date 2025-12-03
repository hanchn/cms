<template>
  <a-menu theme="dark" mode="inline" :selectedKeys="[selectedKey]">
    <a-menu-item v-for="item in items" :key="item.key">
      <RouterLink :to="item.path">{{ item.title }}</RouterLink>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNav } from '../../../apis'
import { useLayoutStore } from '../../../stores/layout'

const items = ref([])
const route = useRoute()
const router = useRouter()
const store = useLayoutStore()

const selectedKey = computed(() => route.name || '')

onMounted(async () => {
  const nav = await getNav()
  store.setNav(nav)
  const routes = router.getRoutes()
  items.value = nav.filter(n => routes.some(r => r.path === n.path))
})
</script>