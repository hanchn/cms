<template>
  <section>
    <h1>欢迎使用 CMS 后台</h1>
    <p>当前环境：{{ env }}</p>
    <UserPanel />
  </section>
</template>

<script setup>
import { env } from '../../config/env'
import UserPanel from './components/UserPanel.vue'
</script>