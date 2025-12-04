<template>
  <div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="ctx.state.loading" size="middle" :rowSelection="rowSelection">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button type="link" size="small" @click="ctx.toDetail(record.id)">查看详情</a-button>
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
import { computed, inject } from 'vue'
const ctx = inject('orderList')
const columns = [
  { title: '订单号', dataIndex: 'id', key: 'id' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '渠道', dataIndex: 'channel', key: 'channel' },
  { title: '下单时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '客户', dataIndex: 'customer', key: 'customer' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
const rowSelection = computed(() => ({
  selectedRowKeys: ctx.state.selectedRowKeys,
  onChange: (keys) => ctx.onRowSelect(keys)
}))
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>