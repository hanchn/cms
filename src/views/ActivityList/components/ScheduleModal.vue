<template>
  <a-modal :open="ctx.state.scheduleVisible" title="设置定时" okText="保存" cancelText="取消" @ok="submit" @cancel="ctx.state.scheduleVisible=false" destroyOnClose>
    <a-form :model="form" layout="vertical">
      <a-form-item label="时间范围">
        <a-range-picker v-model:value="form.range" show-time />
      </a-form-item>
      <a-form-item label="CRON 规则">
        <a-input v-model:value="form.cron" placeholder="例如 0 0 * * *" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { inject, reactive } from 'vue'
const ctx = inject('activity')
const form = reactive({ range: [], cron: '' })
async function submit(){
  const payload = { cron: form.cron }
  if (Array.isArray(form.range) && form.range.length === 2) {
    payload.startTime = form.range[0]
    payload.endTime = form.range[1]
  }
  await ctx.onScheduleSubmit(payload)
}
</script>