<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="渠道">
        <a-select v-model:value="local.channel" allowClear placeholder="渠道" style="width:160px">
          <a-select-option value="web">Web</a-select-option>
          <a-select-option value="app">App</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="local.status" allowClear placeholder="状态" style="width:160px">
          <a-select-option value="pending">待出库</a-select-option>
          <a-select-option value="packed">已打包</a-select-option>
        </a-select>
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onAdd()">创建出库单</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryOutbound')
const local = reactive({ channel: undefined, status: undefined })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.channel=undefined; local.status=undefined; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>