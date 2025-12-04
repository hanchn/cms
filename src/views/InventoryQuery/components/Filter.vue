<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="SKU">
        <a-input v-model:value="local.sku" allowClear placeholder="SKU" style="width:200px" />
      </a-form-item>
      <a-form-item label="批次">
        <a-input v-model:value="local.batch" allowClear placeholder="批次" style="width:160px" />
      </a-form-item>
      <a-form-item label="库位">
        <a-input v-model:value="local.location" allowClear placeholder="库位" style="width:160px" />
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryQuery')
const local = reactive({ sku: '', batch: '', location: '' })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.sku=''; local.batch=''; local.location=''; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>