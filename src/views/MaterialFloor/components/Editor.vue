<template>
  <div class="editor">
    <a-textarea v-model:value="ctx.state.content" :rows="20" placeholder="在此编写楼层模板" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('floorTemplate')
</script>

<style scoped>
.editor { width: 100%; }
.editor :deep(.ant-input) { font-family: ui-monospace, Menlo, Monaco, Consolas, "Courier New", monospace; }
</style>