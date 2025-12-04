<template>
  <a-modal :open="ctx.state.createVisible" title="新建多语言" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.createVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="键名" required>
        <a-input v-model:value="form.key" placeholder="例如 home.title" />
      </a-form-item>
      <a-form-item label="中文" required>
        <a-input v-model:value="form.zh" />
      </a-form-item>
      <a-form-item label="英文" required>
        <a-input v-model:value="form.en" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea v-model:value="form.desc" :rows="3" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('i18n')
const form = reactive({ key: '', zh: '', en: '', desc: '' })
async function submit(){ await ctx.onCreateSubmit({ ...form }) }
</script>