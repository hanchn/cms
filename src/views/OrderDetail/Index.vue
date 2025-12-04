<template>
  <section class="page">
    <a-spin :spinning="state.loading">
      <a-space direction="vertical" style="width:100%">
        <a-card title="基础信息">
          <a-descriptions bordered size="small" :column="2">
            <a-descriptions-item label="订单号">{{ state.detail?.id }}</a-descriptions-item>
            <a-descriptions-item label="状态">{{ state.detail?.status }}</a-descriptions-item>
            <a-descriptions-item label="渠道">{{ state.detail?.channel }}</a-descriptions-item>
            <a-descriptions-item label="下单时间">{{ state.detail?.createdAt }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
        <a-card title="商品明细">
          <a-table :dataSource="state.detail?.items||[]" :columns="itemColumns" :pagination="false" size="small" :rowKey="rowKey" />
        </a-card>
        <a-card title="收货信息">
          <a-descriptions bordered size="small" :column="2">
            <a-descriptions-item label="收货人">{{ state.detail?.address?.receiver }}</a-descriptions-item>
            <a-descriptions-item label="手机号">{{ state.detail?.address?.mobile }}</a-descriptions-item>
            <a-descriptions-item label="地区">{{ state.detail?.address?.region }}</a-descriptions-item>
            <a-descriptions-item label="详细地址">{{ state.detail?.address?.detail }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
        <a-card title="支付/发货/售后时间线">
          <a-timeline>
            <a-timeline-item v-for="t in state.detail?.timeline||[]" :key="t.time">{{ t.time }} - {{ t.desc }}</a-timeline-item>
          </a-timeline>
        </a-card>
      </a-space>
    </a-spin>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchOrderDetail } from '@apis/order'
const route = useRoute()
const state = reactive({ loading: false, detail: null })
const itemColumns = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '数量', dataIndex: 'qty', key: 'qty' },
  { title: '单价', dataIndex: 'price', key: 'price' }
]
function rowKey(r){ return r.sku }
async function load(){
  const id = Number(route.query.id||1001)
  state.loading = true
  state.detail = await fetchOrderDetail(id)
  state.loading = false
}
onMounted(load)
</script>

<style scoped>
.page { width: 100%; }
</style>