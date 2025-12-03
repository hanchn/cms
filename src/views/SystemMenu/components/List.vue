<template>
  <div>
    <div style="margin-bottom:12px">
      <a-space>
        <a-button type="primary" @click="$emit('add')">新增菜单</a-button>
      </a-space>
    </div>
    <a-table :dataSource="items" :columns="columns" :rowKey="rowKey" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button size="small" @click="$emit('edit', record)">编辑</a-button>
            <a-popconfirm title="确认删除该菜单？" @confirm="$emit('remove', record.id)">
              <a-button size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <div style="margin-top:12px; display:flex; justify-content:flex-end">
      <a-pagination :current="page" :pageSize="pageSize" :total="total" showSizeChanger @change="onPage" @showSizeChange="onSize" />
    </div>
  </div>
  </template>

<script setup>
const props = defineProps({ items: { type: Array, default: () => [] }, total: { type: Number, default: 0 }, page: { type: Number, default: 1 }, pageSize: { type: Number, default: 10 } })
const emit = defineEmits(['page-change', 'add', 'edit', 'remove'])
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '路径', dataIndex: 'path', key: 'path' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '排序', dataIndex: 'order', key: 'order' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
function onPage(p){ emit('page-change', p, props.pageSize) }
function onSize(p, ps){ emit('page-change', p, ps) }
</script>