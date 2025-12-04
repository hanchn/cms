<template>
  <a-modal :open="ctx.state.visible" title="创建调拨单" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="SKU" required>
        <a-input v-model:value="form.sku" placeholder="SKU" />
      </a-form-item>
      <a-form-item label="数量" required>
        <a-input-number v-model:value="form.qty" :min="1" style="width:100%" />
      </a-form-item>
      <a-form-item label="来源库位" required>
        <a-input v-model:value="form.fromLocation" placeholder="如 A-01-01" />
      </a-form-item>
      <a-form-item label="目标库位" required>
        <a-input v-model:value="form.toLocation" placeholder="如 B-02-01" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryTransfer')
const form = reactive({ sku: '', qty: 1, fromLocation: '', toLocation: '' })
function submit(){ ctx.onSubmit({ ...form }) }
</script>