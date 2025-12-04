<template>
  <a-modal :open="ctx.state.visible" title="用户" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.visible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="用户名" required>
        <a-input v-model:value="form.username" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="姓名">
        <a-input v-model:value="form.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select v-model:value="form.role" placeholder="选择角色">
          <a-select-option value="admin">管理员</a-select-option>
          <a-select-option value="editor">编辑</a-select-option>
          <a-select-option value="viewer">查看者</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="form.status" placeholder="选择状态">
          <a-select-option value="enabled">启用</a-select-option>
          <a-select-option value="disabled">禁用</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive, watch } from 'vue'
const ctx = inject('systemUser')
const form = reactive({ username: '', name: '', email: '', role: 'viewer', status: 'enabled' })
watch(() => ctx.state.current, (val) => {
  if(val){
    form.username = val.username || ''
    form.name = val.name || ''
    form.email = val.email || ''
    form.role = val.role || 'viewer'
    form.status = val.status || 'enabled'
  } else {
    form.username=''; form.name=''; form.email=''; form.role='viewer'; form.status='enabled'
  }
}, { immediate: true })
function submit(){ ctx.onSubmit({ ...form }) }
</script>