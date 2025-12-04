<template>
  <div class="editor">
    <CodeEditor v-model="ctx.state.content" language="html" height="600px" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
const ctx = inject('materialTemplateDetail')
</script>

<style scoped>
.editor { width: 100%; }
.editor :deep(.ant-input) { font-family: ui-monospace, Menlo, Monaco, Consolas, "Courier New", monospace; }
</style>