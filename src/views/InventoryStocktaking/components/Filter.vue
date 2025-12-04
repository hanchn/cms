<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="任务名称">
        <a-input v-model:value="local.name" allowClear placeholder="任务名称" style="width:200px" />
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="local.status" allowClear placeholder="状态" style="width:160px">
          <a-select-option value="pending">待执行</a-select-option>
          <a-select-option value="running">进行中</a-select-option>
          <a-select-option value="done">已完成</a-select-option>
        </a-select>
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onAdd()">创建盘点任务</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryStock')
const local = reactive({ name: '', status: undefined })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.name=''; local.status=undefined; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>