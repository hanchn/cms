<template>
  <section class="page">
    <List />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import List from './components/List.vue'
import { fetchBatchLocationList } from '@apis/inventory/batchlocation'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false })
async function load(){ state.loading=true; const res = await fetchBatchLocationList({ page: state.page, pageSize: state.pageSize }); state.items=res.items||[]; state.total=res.total||0; state.loading=false }
function onPageChange(p, ps){ state.page=p; state.pageSize=ps; load() }
provide('inventoryBatchLocation', { state, load, onPageChange })
load()
</script>

<style scoped>
.page { width: 100%; }
</style>