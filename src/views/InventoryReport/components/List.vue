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
const ctx = inject('inventoryReport')
const columns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '入库', dataIndex: 'inbound', key: 'inbound' },
  { title: '出库', dataIndex: 'outbound', key: 'outbound' },
  { title: '损耗', dataIndex: 'loss', key: 'loss' },
  { title: '对账', dataIndex: 'reconcile', key: 'reconcile' }
]
function rowKey(r){ return r.date }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>