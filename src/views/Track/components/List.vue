<template>
  <div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="ctx.state.loading" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-popconfirm title="确认删除该埋点？" okText="确认" cancelText="取消" @confirm="ctx.onRemove(record.id)">
              <a-button type="link" danger size="small">删除</a-button>
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
const ctx = inject('track')
const columns = [
  { title: '埋点名称', dataIndex: 'name', key: 'name' },
  { title: '埋点需求', dataIndex: 'requirement', key: 'requirement' },
  { title: '报文格式', dataIndex: 'format', key: 'format' },
  { title: '实施内容', dataIndex: 'implementation', key: 'implementation' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>