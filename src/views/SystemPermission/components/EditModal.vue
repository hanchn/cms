<template>
  <a-modal :open="ctx.state.visible" title="权限" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="名称" required>
        <a-input v-model:value="form.name" placeholder="请输入权限名称" />
      </a-form-item>
      <a-form-item label="编码" required>
        <a-input v-model:value="form.code" placeholder="请输入权限编码" />
      </a-form-item>
      <a-form-item label="类型">
        <a-select v-model:value="form.type" placeholder="选择类型">
          <a-select-option value="menu">菜单</a-select-option>
          <a-select-option value="api">接口</a-select-option>
          <a-select-option value="button">按钮</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="资源">
        <a-input v-model:value="form.resource" placeholder="请输入资源路径或标识" />
      </a-form-item>
      <a-form-item label="方法">
        <a-select v-model:value="form.method" placeholder="选择方法">
          <a-select-option value="GET">GET</a-select-option>
          <a-select-option value="POST">POST</a-select-option>
          <a-select-option value="PUT">PUT</a-select-option>
          <a-select-option value="PATCH">PATCH</a-select-option>
          <a-select-option value="DELETE">DELETE</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="form.status" placeholder="选择状态">
          <a-select-option value="enabled">启用</a-select-option>
          <a-select-option value="disabled">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="说明">
        <a-input v-model:value="form.desc" placeholder="请输入说明" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive, watch } from 'vue'
const ctx = inject('systemPermission')
const form = reactive({ name: '', code: '', type: 'api', resource: '', method: 'GET', status: 'enabled', desc: '' })
watch(() => ctx.state.current, (val) => {
  if(val){
    form.name = val.name || ''
    form.code = val.code || ''
    form.type = val.type || 'api'
    form.resource = val.resource || ''
    form.method = val.method || 'GET'
    form.status = val.status || 'enabled'
    form.desc = val.desc || ''
  } else {
    form.name=''; form.code=''; form.type='api'; form.resource=''; form.method='GET'; form.status='enabled'; form.desc=''
  }
}, { immediate: true })
function submit(){ ctx.onSubmit({ ...form }) }
</script>