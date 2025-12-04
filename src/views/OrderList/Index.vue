<template>
  <section class="page">
    <Filter />
    <List />
    <BatchModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import { useRouter } from 'vue-router'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import BatchModal from './components/BatchModal.vue'
import { fetchOrderList, exportOrders, batchOperate } from '@apis/order'

const router = useRouter()
const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, query: {}, selectedRowKeys: [], batchVisible: false })

async function load(){
  state.loading = true
  const res = await fetchOrderList({ ...state.query, page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onSearch(q){ state.query = q; state.page = 1; load() }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function onRowSelect(keys){ state.selectedRowKeys = keys }
async function onExport(){ await exportOrders({ ids: state.selectedRowKeys }) }
function openBatch(){ state.batchVisible = true }
async function onBatchSubmit(data){ await batchOperate({ ids: state.selectedRowKeys, ...data }); state.batchVisible = false; load() }
function toDetail(id){ router.push({ path: '/orderdetail', query: { id } }) }

provide('orderList', { state, load, onSearch, onPageChange, onRowSelect, onExport, openBatch, onBatchSubmit, toDetail })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>