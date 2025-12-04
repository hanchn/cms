<template>
  <div>
    <a-space direction="vertical" style="width:100%">
      <a-card title="失败 2 次后成功">
        <a-space>
          <a-button type="primary" @click="testSuccess">触发请求（重试 2 次）</a-button>
          <span>结果：{{ successText }}</span>
        </a-space>
      </a-card>
      <a-card title="失败 3 次后仍失败">
        <a-space>
          <a-button danger @click="testFail">触发请求（重试 2 次）</a-button>
          <span>错误：{{ failText }}</span>
        </a-space>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { get } from '@apis/main'

const successText = ref('未开始')
const failText = ref('未开始')

async function testSuccess(){
  successText.value = '请求中...'
  try {
    const res = await get('/mock/_fail/2', null, null, { retry: 2, retryDelay: 300 })
    successText.value = `success=${res?.success}, attempts=${res?.attempts}`
  } catch (e) {
    successText.value = String(e?.message || e)
  }
}

async function testFail(){
  failText.value = '请求中...'
  try {
    await get('/mock/_fail/3', null, null, { retry: 2, retryDelay: 300 })
    failText.value = '意外成功'
  } catch (e) {
    failText.value = String(e?.message || e)
  }
}
</script>

<style scoped>
</style>