<template>
  <section class="page">
    <a-card title="支付记录">
      <a-table :dataSource="state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="state.loading" />
    </a-card>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { fetchPaymentList } from '@apis/payment'
const state = reactive({ items: [], loading: false })
const columns = [
  { title: '记录ID', dataIndex: 'id', key: 'id' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '渠道', dataIndex: 'channel', key: 'channel' },
  { title: '交易号', dataIndex: 'tradeNo', key: 'tradeNo' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '时间', dataIndex: 'time', key: 'time' },
  { title: '对账', dataIndex: 'reconciled', key: 'reconciled' }
]
function rowKey(r){ return r.id }
async function load(){ state.loading=true; const res = await fetchPaymentList({ page:1, pageSize:10 }); state.items=res.items||[]; state.loading=false }
onMounted(load)
</script>

<style scoped>
.page { width: 100%; }
</style>