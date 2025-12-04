<template>
  <a-modal :open="ctx.state.createVisible" title="新建活动" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.createVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="活动名称" required>
        <a-input v-model:value="form.name" placeholder="请输入活动名称" />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea v-model:value="form.desc" :rows="3" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('activity')
const form = reactive({ name: '', desc: '' })
async function submit(){ await ctx.onCreateSubmit({ ...form }) }
</script>