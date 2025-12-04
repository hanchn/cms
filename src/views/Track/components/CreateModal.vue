<template>
  <a-modal :open="ctx.state.createVisible" title="新建埋点" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.createVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="埋点名称" required>
        <a-input v-model:value="form.name" placeholder="请输入埋点名称" />
      </a-form-item>
      <a-form-item label="埋点需求" required>
        <a-textarea v-model:value="form.requirement" :rows="3" placeholder="说明埋点的业务背景与目标" />
      </a-form-item>
      <a-form-item label="报文格式" required>
        <a-textarea v-model:value="form.format" :rows="3" placeholder="示例：JSON 字段定义" />
      </a-form-item>
      <a-form-item label="实施内容" required>
        <a-textarea v-model:value="form.implementation" :rows="3" placeholder="前端/后端埋点方案与落地位置" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('track')
const form = reactive({ name: '', requirement: '', format: '', implementation: '' })
async function submit(){ await ctx.onCreateSubmit({ ...form }) }
</script>