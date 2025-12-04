<template>
  <div class="toolbar">
    <a-space style="width:100%; justify-content:flex-end">
      <a-button type="primary" @click="ctx.openCreate()">新建站点语言</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('i18nSite')
</script>

<style scoped>
.toolbar { margin-bottom: 12px; }
</style>