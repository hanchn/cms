<template>
  <div class="toolbar">
    <a-space>
      <a-button type="primary" @click="goCreate">新建模板</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const ctx = inject('emailTemplate')
const router = useRouter()
function goCreate(){ router.push('/materialemailtemplatedetail') }
</script>

<style scoped>
.toolbar { margin-bottom: 16px; display: flex; justify-content: space-between; }
</style>