<template>
  <section class="page">
    <a-space direction="vertical" style="width:100%">
      <a-card title="待发货队列">
        <a-space style="margin-bottom:8px; justify-content:flex-end; width:100%">
          <a-button type="primary" @click="openCreate">批量创建包裹</a-button>
          <a-button @click="openPrint">打印面单</a-button>
        </a-space>
        <a-table :dataSource="state.queue" :columns="queueColumns" :rowKey="rowKey" :pagination="false" />
      </a-card>
      <a-card title="发货记录">
        <a-table :dataSource="state.records" :columns="recordColumns" :rowKey="rowKey2" :pagination="false" />
      </a-card>
    </a-space>
    <a-modal :open="state.createVisible" title="批量创建包裹" okText="创建" cancelText="取消" @ok="createPackagesSubmit" @cancel="state.createVisible=false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="选择订单">
          <a-input v-model:value="form.orderIds" placeholder="例如 1002,1003" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :open="state.printVisible" title="打印面单" okText="打印" cancelText="取消" @ok="printSubmit" @cancel="state.printVisible=false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="包裹号">
          <a-input v-model:value="form.packageNos" placeholder="例如 PKG1002-1,PKG1003-1" />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { fetchShipmentQueue, fetchShipmentRecords, createPackages, printLabels } from '@apis/shipment'
const state = reactive({ queue: [], records: [], createVisible: false, printVisible: false })
const form = reactive({ orderIds: '', packageNos: '' })
const queueColumns = [
  { title: '队列ID', dataIndex: 'id', key: 'id' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '加入时间', dataIndex: 'createdAt', key: 'createdAt' }
]
const recordColumns = [
  { title: '记录ID', dataIndex: 'id', key: 'id' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '包裹号', dataIndex: 'packageNo', key: 'packageNo' },
  { title: '物流公司', dataIndex: 'logistics', key: 'logistics' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '发货时间', dataIndex: 'shippedAt', key: 'shippedAt' }
]
function rowKey(r){ return r.id }
function rowKey2(r){ return r.id }
function openCreate(){ state.createVisible = true }
function openPrint(){ state.printVisible = true }
async function createPackagesSubmit(){ await createPackages({ orderIds: form.orderIds }); state.createVisible=false }
async function printSubmit(){ await printLabels({ packageNos: form.packageNos }); state.printVisible=false }
async function load(){
  const q = await fetchShipmentQueue({ page: 1, pageSize: 10 })
  state.queue = q.items || []
  const r = await fetchShipmentRecords({ page: 1, pageSize: 10 })
  state.records = r.items || []
}
onMounted(load)
</script>

<style scoped>
.page { width: 100%; }
</style>