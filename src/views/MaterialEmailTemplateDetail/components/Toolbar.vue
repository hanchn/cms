<template>
  <div class="toolbar">
    <a-space>
      <a-input v-model:value="ctx.state.name" style="width: 240px" placeholder="模板名称" />
      <a-button type="primary" :loading="ctx.state.saving" @click="ctx.save">保存</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('emailTemplateDetail')
</script>

<style scoped>
.toolbar { margin-bottom: 16px; display: flex; justify-content: space-between; }
</style>