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
const ctx = inject('inventoryAlert')
const columns = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '阈值', dataIndex: 'threshold', key: 'threshold' },
  { title: '当前', dataIndex: 'current', key: 'current' },
  { title: '建议', dataIndex: 'suggest', key: 'suggest' }
]
function rowKey(r){ return r.sku }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>