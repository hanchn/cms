<template>
  <a-modal :open="ctx.state.createVisible" title="站点语言" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.createVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="站点编码" required>
        <a-input v-model:value="form.siteCode" placeholder="例如 main / intl" />
      </a-form-item>
      <a-form-item label="站点名称">
        <a-input v-model:value="form.siteName" placeholder="请输入站点名称" />
      </a-form-item>
      <a-form-item label="语言编码" required>
        <a-input v-model:value="form.langCode" placeholder="例如 zh-CN / en-US" />
      </a-form-item>
      <a-form-item label="语言名称">
        <a-input v-model:value="form.langName" placeholder="请输入语言名称" />
      </a-form-item>
      <a-form-item label="默认">
        <a-switch v-model:checked="form.default" />
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
const ctx = inject('i18nSite')
const form = reactive({ siteCode: '', siteName: '', langCode: '', langName: '', default: false, status: 'enabled' })
watch(() => ctx.state.current, (val) => {
  if(val){
    form.siteCode = val.siteCode || ''
    form.siteName = val.siteName || ''
    form.langCode = val.langCode || ''
    form.langName = val.langName || ''
    form.default = !!val.default
    form.status = val.status || 'enabled'
  } else {
    form.siteCode=''; form.siteName=''; form.langCode=''; form.langName=''; form.default=false; form.status='enabled'
  }
}, { immediate: true })
function submit(){ ctx.onCreateSubmit({ ...form }) }
</script>