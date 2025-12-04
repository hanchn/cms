<template>
  <a-modal :open="ctx.state.visible" title="创建入库单" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="供应商" required>
        <a-input v-model:value="form.supplier" placeholder="供应商名称" />
      </a-form-item>
      <a-form-item label="到货日期">
        <a-date-picker v-model:value="form.arrivalDate" style="width:100%" />
      </a-form-item>
      <a-form-item label="SKU 列表（扫码/录入）">
        <a-textarea v-model:value="form.skus" rows="4" placeholder="例如：SKU001 x10; SKU002 x5" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryInbound')
const form = reactive({ supplier: '', arrivalDate: null, skus: '' })
function submit(){ ctx.onSubmit({ ...form }) }
</script>