<template>
  <a-modal :open="ctx.state.confirmVisible" title="批量删除确认" @cancel="ctx.state.confirmVisible=false" @ok="ctx.onBatchDelete" okText="确认删除" cancelText="取消" :okButtonProps="{ danger: true }" destroyOnClose>
    <p>即将删除 {{ ctx.state.selectedKeys.length }} 条菜单记录，此操作不可恢复，是否继续？</p>
  </a-modal>
  </template>

<script setup>
import { inject } from 'vue'
const ctx = inject('systemMenu')
</script>