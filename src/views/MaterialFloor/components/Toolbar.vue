<template>
  <div class="toolbar">
    <a-space>
      <a-select v-model:value="current" style="width: 220px" placeholder="选择模板" @change="onSelect">
        <a-select-option v-for="t in ctx.state.list" :key="t.id" :value="t.id">{{ t.name }}</a-select-option>
      </a-select>
      <a-input v-model:value="ctx.state.name" style="width: 220px" placeholder="模板名称" />
      <a-button type="primary" :loading="ctx.state.saving" @click="ctx.save">保存</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
const ctx = inject('floorTemplate')
const current = ref(null)
watch(() => ctx.state.currentId, (id) => { current.value = id })
function onSelect(id){ ctx.select(id) }
</script>

<style scoped>
.toolbar { margin-bottom: 16px; display: flex; justify-content: space-between; }
</style>