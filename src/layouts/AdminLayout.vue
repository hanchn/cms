<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider theme="dark" width="240">
      <div class="brand">CMS</div>
      <a-menu theme="dark" mode="inline" :selectedKeys="[selectedKey]">
        <a-menu-item key="Dashboard">
          <RouterLink to="/dashboard">仪表盘</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="padding: 24px">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
  </template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const selectedKey = computed(() => route.name || 'Dashboard')
</script>

<style scoped>
.brand { color: #fff; font-weight: 600; margin: 16px 16px 12px; }
</style>