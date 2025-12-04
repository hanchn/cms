<template>
  <section class="page">
    <a-card title="物流跟踪">
      <a-table :dataSource="state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="state.loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='actions'">
            <a-space>
              <a-button type="link" size="small" @click="openTrack(record.id)">轨迹</a-button>
              <a-button type="link" size="small" @click="openFix(record.id)">地址纠偏</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal :open="state.trackVisible" title="包裹轨迹" okText="关闭" cancelText="关闭" @ok="state.trackVisible=false" @cancel="state.trackVisible=false">
      <a-timeline>
        <a-timeline-item v-for="t in state.trace" :key="t.time">{{ t.time }} - {{ t.desc }}</a-timeline-item>
      </a-timeline>
    </a-modal>
    <a-modal :open="state.fixVisible" title="地址纠偏" okText="提交" cancelText="取消" @ok="submitFix" @cancel="state.fixVisible=false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="新地址">
          <a-input v-model:value="form.address" placeholder="请输入新地址" />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { fetchLogisticsList, fetchTrack, fixAddress } from '@apis/logistics'
const state = reactive({ items: [], loading: false, trackVisible: false, trace: [], fixVisible: false, currentId: null })
const form = reactive({ address: '' })
const columns = [
  { title: '记录ID', dataIndex: 'id', key: 'id' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '包裹号', dataIndex: 'packageNo', key: 'packageNo' },
  { title: '公司', dataIndex: 'company', key: 'company' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
async function load(){ state.loading=true; const res = await fetchLogisticsList({ page:1, pageSize:10 }); state.items=res.items||[]; state.loading=false }
async function openTrack(id){ state.currentId=id; const tr = await fetchTrack(id); state.trace=tr.trace||[]; state.trackVisible=true }
function openFix(id){ state.currentId=id; state.fixVisible=true }
async function submitFix(){ await fixAddress(state.currentId, { address: form.address }); state.fixVisible=false }
onMounted(load)
</script>

<style scoped>
.page { width: 100%; }
</style>