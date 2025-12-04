<template>
  <a-modal :open="ctx.state.visible" title="创建出库单" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="渠道">
        <a-select v-model:value="form.channel" placeholder="选择渠道">
          <a-select-option value="web">Web</a-select-option>
          <a-select-option value="app">App</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="SKU 列表">
        <a-textarea v-model:value="form.skus" rows="4" placeholder="例如：SKU001 x2; SKU003 x1" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryOutbound')
const form = reactive({ channel: 'web', skus: '' })
function submit(){ ctx.onSubmit({ ...form }) }
</script>