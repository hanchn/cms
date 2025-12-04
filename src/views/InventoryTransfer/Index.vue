<template>
  <section class="page">
    <Filter />
    <List />
    <CreateModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import CreateModal from './components/CreateModal.vue'
import { fetchTransferList, createTransfer, approveTransfer } from '@apis/inventory/transfer'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, query: {}, visible: false })

async function load(){ state.loading=true; const res = await fetchTransferList({ ...state.query, page: state.page, pageSize: state.pageSize }); state.items=res.items||[]; state.total=res.total||0; state.loading=false }
function onSearch(q){ state.query=q; state.page=1; load() }
function onPageChange(p, ps){ state.page=p; state.pageSize=ps; load() }
function onAdd(){ state.visible=true }
async function onSubmit(data){ await createTransfer(data); state.visible=false; load() }
async function onApprove(id){ await approveTransfer(id); load() }

provide('inventoryTransfer', { state, load, onSearch, onPageChange, onAdd, onSubmit, onApprove })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>