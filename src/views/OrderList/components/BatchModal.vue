<template>
  <a-modal :open="ctx.state.batchVisible" title="批量操作" okText="执行" cancelText="取消" @ok="submit" @cancel="ctx.state.batchVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="操作类型">
        <a-select v-model:value="form.action" placeholder="选择操作">
          <a-select-option value="mark_shipped">标记已发货</a-select-option>
          <a-select-option value="close">关闭订单</a-select-option>
          <a-select-option value="tag_vip">加V标签</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注">
        <a-input v-model:value="form.remark" placeholder="备注信息" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('orderList')
const form = reactive({ action: undefined, remark: '' })
function submit(){ ctx.onBatchSubmit({ ...form }) }
</script>