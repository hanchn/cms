<template>
  <section class="page">
    <Filter />
    <List />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import { fetchInventoryReport } from '@apis/inventory/report'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, query: {} })
async function load(){ state.loading=true; const res = await fetchInventoryReport({ ...state.query, page: state.page, pageSize: state.pageSize }); state.items=res.items||[]; state.total=res.total||0; state.loading=false }
function onSearch(q){ state.query=q; state.page=1; load() }
function onPageChange(p, ps){ state.page=p; state.pageSize=ps; load() }
provide('inventoryReport', { state, load, onSearch, onPageChange })
load()
</script>

<style scoped>
.page { width: 100%; }
</style>