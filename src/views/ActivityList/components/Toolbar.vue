<template>
  <div class="toolbar">
    <a-space>
      <a-button type="primary" @click="ctx.openCreate()">新建活动</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('activity')
</script>

<style scoped>
.toolbar { margin-bottom: 16px; display: flex; justify-content: space-between; }
</style>