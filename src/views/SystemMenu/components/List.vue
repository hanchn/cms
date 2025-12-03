<template>
  <div>
    <div style="margin-bottom:12px">
      <a-space>
        <a-button type="primary" @click="ctx.onAdd()">新增菜单</a-button>
      </a-space>
    </div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button size="small" @click="ctx.onEdit(record)">编辑</a-button>
            <a-popconfirm title="确认删除该菜单？" @confirm="ctx.onRemove(record.id)">
              <a-button size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <div style="margin-top:12px; display:flex; justify-content:flex-end">
      <a-pagination :current="ctx.state.page" :pageSize="ctx.state.pageSize" :total="ctx.state.total" showSizeChanger @change="onPage" @showSizeChange="onSize" />
    </div>
  </div>
  </template>

<script setup>
import { inject } from 'vue'
const ctx = inject('systemMenu')
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '路径', dataIndex: 'path', key: 'path' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '排序', dataIndex: 'order', key: 'order' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>