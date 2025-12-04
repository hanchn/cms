<template>
  <a-modal :open="ctx.state.visible" title="菜单" @cancel="ctx.state.visible=false" @ok="submit" okText="保存" cancelText="取消" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="名称" required>
        <a-input v-model:value="form.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="路径" required>
        <a-input v-model:value="form.path" placeholder="请输入路径" />
      </a-form-item>
      <a-form-item label="类型">
        <a-select v-model:value="form.type" placeholder="选择类型">
          <a-select-option value="menu">菜单</a-select-option>
          <a-select-option value="group">分组</a-select-option>
          <a-select-option value="link">链接</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="form.status" placeholder="选择状态">
          <a-select-option value="enabled">启用</a-select-option>
          <a-select-option value="disabled">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number v-model:value="form.order" :min="0" style="width:100%" />
      </a-form-item>
      <a-form-item v-if="ctx.state.batchMode==='add'" label="批量添加数量">
        <a-input-number v-model:value="batchCount" :min="1" :max="20" style="width:100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, watch, reactive, ref } from 'vue'
const ctx = inject('systemMenu')
const form = reactive({ name: '', path: '', type: 'menu', status: 'enabled', order: 0 })
const batchCount = ref(1)
watch(() => ctx.state.current, (val) => {
  if (val) {
    form.name = val.name
    form.path = val.path
    form.type = val.type
    form.status = val.status
    form.order = val.order
  } else {
    form.name=''
    form.path=''
    form.type='menu'
    form.status='enabled'
    form.order=0
  }
}, { immediate: true })
function submit(){ ctx.onSubmit({ ...form, batchCount: batchCount.value }) }
</script>