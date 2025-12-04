<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="供应商">
        <a-input v-model:value="local.supplier" allowClear placeholder="供应商" style="width:200px" />
      </a-form-item>
      <a-form-item label="到货时间">
        <a-range-picker v-model:value="local.arrivalRange" showTime style="width:320px" />
      </a-form-item>
      <a-form-item label="SKU">
        <a-input v-model:value="local.sku" allowClear placeholder="SKU" style="width:200px" />
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onAdd()">创建入库单</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryInbound')
const local = reactive({ supplier: '', arrivalRange: [], sku: '' })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.supplier=''; local.arrivalRange=[]; local.sku=''; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>