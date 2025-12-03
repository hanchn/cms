<template>
  <a-card title="用户示例" style="max-width: 600px">
    <a-button type="primary" @click="load">加载用户</a-button>
    <div style="margin-top:12px">共 {{ users.length }} 个用户</div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { getUsers } from '../../../apis'
const users = ref([])
async function load(){
  users.value = await getUsers()
}
</script>