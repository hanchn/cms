<template>
  <a-modal :open="ctx.state.visible" title="创建盘点任务" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="任务名称" required>
        <a-input v-model:value="form.name" placeholder="任务名称" />
      </a-form-item>
      <a-form-item label="盘点范围">
        <a-input v-model:value="form.scope" placeholder="例如：库位 A-01 或 SKU 前缀" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('inventoryStock')
const form = reactive({ name: '', scope: '' })
function submit(){ ctx.onSubmit({ ...form }) }
</script>