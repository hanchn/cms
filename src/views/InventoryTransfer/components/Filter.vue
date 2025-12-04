<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="SKU">
        <a-input v-model:value="local.sku" allowClear placeholder="SKU" style="width:200px" />
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="local.status" allowClear placeholder="状态" style="width:160px">
          <a-select-option value="pending">待审核</a-select-option>
          <a-select-option value="approved">已通过</a-select-option>
        </a-select>
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onAdd()">创建调拨单</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryTransfer')
const local = reactive({ sku: '', status: undefined })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.sku=''; local.status=undefined; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>