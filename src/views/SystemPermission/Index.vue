<template>
  <section>
    <h1>权限管理</h1>
    <a-card style="max-width: 900px">
      <a-table :dataSource="[]" :columns="columns" />
    </a-card>
  </section>
</template>

<script setup>
const columns = [
  { title: '角色', dataIndex: 'role' },
  { title: '权限点', dataIndex: 'permission' },
  { title: '描述', dataIndex: 'desc' }
]
</script>