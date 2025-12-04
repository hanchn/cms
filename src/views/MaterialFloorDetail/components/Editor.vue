<template>
  <div class="editor">
    <a-tabs v-model:activeKey="tab">
      <a-tab-pane key="html" tab="HTML">
        <CodeEditor v-model="ctx.state.html" language="html" height="260px" />
      </a-tab-pane>
      <a-tab-pane key="css" tab="CSS">
        <CodeEditor v-model="ctx.state.css" language="css" height="260px" />
      </a-tab-pane>
      <a-tab-pane key="js" tab="JS">
        <CodeEditor v-model="ctx.state.js" language="javascript" height="260px" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
const ctx = inject('floorTemplateDetail')
const tab = ref('html')
function assemble(){
  const css = ctx.state.css ? `<style>${ctx.state.css}</style>` : ''
  const js = ctx.state.js ? `<script>${ctx.state.js}</script>` : ''
  ctx.state.content = `${css}${ctx.state.html || ''}${js}`
}
watch(() => [ctx.state.html, ctx.state.css, ctx.state.js], assemble, { deep: true })
</script>

<style scoped>
.editor { width: 100%; }
.editor :deep(.ant-input) { font-family: ui-monospace, Menlo, Monaco, Consolas, "Courier New", monospace; }
</style>