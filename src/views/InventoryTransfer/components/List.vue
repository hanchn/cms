<template>
  <div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="ctx.state.loading" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button type="link" size="small" @click="ctx.onApprove(record.id)">审核通过</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <div style="margin-top:12px; display:flex; justify-content:flex-end">
      <a-pagination :current="ctx.state.page" :pageSize="ctx.state.pageSize" :total="ctx.state.total" showSizeChanger @change="onPage" @showSizeChange="onSize" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('inventoryTransfer')
const columns = [
  { title: '调拨单号', dataIndex: 'id', key: 'id' },
  { title: 'SKU', dataIndex: 'sku', key: 'sku' },
  { title: '数量', dataIndex: 'qty', key: 'qty' },
  { title: '来源库位', dataIndex: 'fromLocation', key: 'fromLocation' },
  { title: '目标库位', dataIndex: 'toLocation', key: 'toLocation' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>