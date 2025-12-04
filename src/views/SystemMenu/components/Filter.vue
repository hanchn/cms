<template>
  <div class="filter-wrap">
  <a-form layout="inline" @submit.prevent>
    <a-form-item label="名称">
      <a-input v-model:value="local.name" allowClear placeholder="菜单名称" style="width:200px" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="local.status" allowClear placeholder="选择状态" style="width:160px">
        <a-select-option value="enabled">启用</a-select-option>
        <a-select-option value="disabled">禁用</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="local.type" allowClear placeholder="选择类型" style="width:160px">
        <a-select-option value="menu">菜单</a-select-option>
        <a-select-option value="group">分组</a-select-option>
        <a-select-option value="link">链接</a-select-option>
      </a-select>
    </a-form-item>
    <a-space>
      <a-button type="primary" @click="emitSearch">筛选</a-button>
      <a-button @click="reset">重置</a-button>
    </a-space>
  </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('systemMenu')
const local = reactive({ name: '', status: undefined, type: undefined })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.name=''; local.status=undefined; local.type=undefined; emitSearch() }
</script>
<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>