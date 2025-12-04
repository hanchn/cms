<template>
  <div class="editor">
    <a-textarea v-model:value="ctx.state.content" :rows="20" placeholder="在此编写 HTML 模板" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('materialTemplate')
</script>

<style scoped>
.editor { width: 100%; }
.editor :deep(.ant-input) { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
</style>