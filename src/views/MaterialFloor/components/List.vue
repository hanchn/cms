<template>
  <div>
    <a-table :dataSource="paged" :columns="columns" :rowKey="rowKey" :pagination="false" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button type="link" size="small" @click="goDetail(record.id)">编辑</a-button>
            <a-popconfirm title="确认删除该模板？" okText="确认" cancelText="取消" @confirm="ctx.remove(record.id)">
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
import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const ctx = inject('floorTemplate')
const router = useRouter()
function goDetail(id){ router.push(`/materialfloordetail?id=${id}`) }
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '操作', key: 'actions' }
]
function rowKey(r){ return r.id }
const paged = computed(() => {
  const start = (ctx.state.page - 1) * ctx.state.pageSize
  return ctx.state.list.slice(start, start + ctx.state.pageSize)
})
function onPage(p){ ctx.state.page = p }
function onSize(p, ps){ ctx.state.page = p; ctx.state.pageSize = ps }
</script>