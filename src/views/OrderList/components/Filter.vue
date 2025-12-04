<template>
  <div class="filter-wrap">
    <a-form layout="inline" @submit.prevent>
      <a-form-item label="状态">
        <a-select v-model:value="local.status" allowClear placeholder="选择状态" style="width:160px">
          <a-select-option value="pending">待支付</a-select-option>
          <a-select-option value="paid">已支付</a-select-option>
          <a-select-option value="shipped">已发货</a-select-option>
          <a-select-option value="completed">已完成</a-select-option>
          <a-select-option value="refunding">售后中</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="渠道">
        <a-select v-model:value="local.channel" allowClear placeholder="选择渠道" style="width:160px">
          <a-select-option value="web">Web</a-select-option>
          <a-select-option value="app">App</a-select-option>
          <a-select-option value="miniapp">小程序</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="时间">
        <a-range-picker v-model:value="local.range" showTime style="width:320px" />
      </a-form-item>
      <a-space>
        <a-button type="primary" @click="emitSearch">筛选</a-button>
        <a-button @click="reset">重置</a-button>
        <a-button @click="ctx.onExport()">批量导出</a-button>
        <a-button @click="ctx.openBatch()">批量操作</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('orderList')
const local = reactive({ status: undefined, channel: undefined, range: [] })
function emitSearch(){ ctx.onSearch({ ...local }) }
function reset(){ local.status=undefined; local.channel=undefined; local.range=[]; emitSearch() }
</script>

<style scoped>
.filter-wrap { margin-bottom: 16px; }
</style>