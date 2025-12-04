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
const ctx = inject('inventoryQuery')
const columns = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku' },
  { title: '可用', dataIndex: 'available', key: 'available' },
  { title: '占用', dataIndex: 'reserved', key: 'reserved' },
  { title: '批次', dataIndex: 'batch', key: 'batch' },
  { title: '库位', dataIndex: 'location', key: 'location' },
  { title: '有效期', dataIndex: 'expireDate', key: 'expireDate' }
]
function rowKey(r){ return `${r.sku}-${r.batch}-${r.location}` }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>