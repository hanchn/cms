<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="用户名">
        <a-input v-model:value="local.username" allowClear placeholder="用户名" style="width:200px" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select v-model:value="local.role" allowClear placeholder="选择角色" style="width:160px">
          <a-select-option value="admin">管理员</a-select-option>
          <a-select-option value="editor">编辑</a-select-option>
          <a-select-option value="viewer">查看者</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="local.status" allowClear placeholder="选择状态" style="width:160px">
          <a-select-option value="enabled">启用</a-select-option>
          <a-select-option value="disabled">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onAdd()">新增用户</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('systemUser')
const local = reactive({ username: '', role: undefined, status: undefined })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.username=''; local.role=undefined; local.status=undefined; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>