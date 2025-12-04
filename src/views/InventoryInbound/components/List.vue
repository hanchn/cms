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
const ctx = inject('inventoryInbound')
const columns = [
  { title: '入库单号', dataIndex: 'id', key: 'id' },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
  { title: 'SKU数量', dataIndex: 'skuCount', key: 'skuCount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '到货日期', dataIndex: 'arrivalDate', key: 'arrivalDate' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>