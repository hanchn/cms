<template>
  <div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :loading="ctx.state.loading" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='default'">
          <a-tag :color="record.default ? 'green' : 'default'">{{ record.default ? '是' : '否' }}</a-tag>
        </template>
        <template v-if="column.key==='status'">
          <a-tag :color="record.status==='enabled' ? 'blue' : 'default'">{{ record.status==='enabled' ? '启用' : '禁用' }}</a-tag>
        </template>
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button type="link" size="small" @click="ctx.openEdit(record)">编辑</a-button>
            <a-popconfirm title="确认删除该站点语言？" okText="确认" cancelText="取消" @confirm="ctx.onRemove(record.id)">
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
const ctx = inject('i18nSite')
const columns = [
  { title: '站点编码', dataIndex: 'siteCode', key: 'siteCode' },
  { title: '站点名称', dataIndex: 'siteName', key: 'siteName' },
  { title: '语言编码', dataIndex: 'langCode', key: 'langCode' },
  { title: '语言名称', dataIndex: 'langName', key: 'langName' },
  { title: '默认', dataIndex: 'default', key: 'default' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>