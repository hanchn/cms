<template>
  <div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="ctx.state.loading" size="middle">
    </a-table>
    <div style="margin-top:12px; display:flex; justify-content:flex-end">
      <a-pagination :current="ctx.state.page" :pageSize="ctx.state.pageSize" :total="ctx.state.total" showSizeChanger @change="onPage" @showSizeChange="onSize" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('inventoryBatchLocation')
const columns = [
  { title: '批次', dataIndex: 'batch', key: 'batch' },
  { title: 'SKU', dataIndex: 'sku', key: 'sku' },
  { title: '库位', dataIndex: 'location', key: 'location' },
  { title: '有效期', dataIndex: 'expireDate', key: 'expireDate' },
  { title: '质检状态', dataIndex: 'quality', key: 'quality' }
]
function rowKey(r){ return `${r.batch}-${r.location}` }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>