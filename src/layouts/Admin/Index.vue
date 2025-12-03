<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider theme="dark" width="240">
      <div class="brand">CMS</div>
      <SideNav />
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="padding: 24px">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SideNav from './components/SideNav.vue'
</script>

<style scoped>
.brand { color: #fff; font-weight: 600; margin: 16px 16px 12px; }
</style>