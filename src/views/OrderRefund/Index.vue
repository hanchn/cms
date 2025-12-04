<template>
  <section class="page">
    <a-card title="退款售后">
      <a-table :dataSource="state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="state.loading" />
    </a-card>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { fetchRefundList } from '@apis/orderRefund'
const state = reactive({ items: [], loading: false })
const columns = [
  { title: '退款ID', dataIndex: 'id', key: 'id' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '申请时间', dataIndex: 'createdAt', key: 'createdAt' }
]
function rowKey(r){ return r.id }
async function load(){ state.loading=true; const res = await fetchRefundList({ page:1, pageSize:10 }); state.items=res.items||[]; state.loading=false }
onMounted(load)
</script>

<style scoped>
.page { width: 100%; }
</style>