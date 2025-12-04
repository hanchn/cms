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
const ctx = inject('inventoryStock')
const columns = [
  { title: '任务ID', dataIndex: 'id', key: 'id' },
  { title: '任务名称', dataIndex: 'name', key: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>