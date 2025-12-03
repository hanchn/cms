<template>
  <section>
    <h1>用户管理</h1>
    <a-card style="max-width: 900px">
      <a-table :dataSource="[]" :columns="columns" />
    </a-card>
  </section>
</template>

<script setup>
const columns = [
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status' }
]
</script>