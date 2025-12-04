<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="日期">
        <a-range-picker v-model:value="local.range" style="width:320px" />
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
const ctx = inject('inventoryReport')
const local = reactive({ range: [] })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.range=[]; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>