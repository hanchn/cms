<template>
  <div>
    <div style="margin:16px 0">
      <a-space>
        <a-button type="primary" @click="ctx.onAdd()">新增菜单</a-button>
        <a-button @click="ctx.onBatchAdd()" :disabled="!ctx.state.selectedKeys.length">批量添加子菜单</a-button>
        <a-button @click="ctx.onBatchEdit()" :disabled="!ctx.state.selectedKeys.length">批量编辑</a-button>
        <a-button danger @click="ctx.onBatchDeleteAsk()" :disabled="!ctx.state.selectedKeys.length">批量删除</a-button>
      </a-space>
    </div>
    <a-table :dataSource="ctx.state.items" :columns="columns" :rowKey="rowKey" :pagination="false" :rowSelection="rowSelection">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='order'">
          <span draggable="true" @dragstart="onDragStart(record)" @dragover.prevent @drop="onDrop(record)" style="cursor: grab">{{ record.order ?? '' }}</span>
        </template>
        <template v-if="column.key==='actions'">
          <a-space>
            <a-button type="link" size="small" @click="ctx.onEdit(record)">编辑</a-button>
            <a-button type="link" size="small" @click="ctx.onAddChild(record)">添加子菜单</a-button>
            <a-popconfirm title="确认删除该菜单？" okText="确认" cancelText="取消" @confirm="ctx.onRemove(record.id)">
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
let dragId = null
function onDragStart(record){ dragId = record.id }
function onDrop(target){
  if(dragId==null || dragId===target.id) return
  const src = locate(ctx.state.items, dragId)
  const dst = locate(ctx.state.items, target.id)
  if(!src || !dst) return
  if(src.parent !== dst.parent) return
  const arr = src.parent || ctx.state.items
  const [m] = arr.splice(src.index, 1)
  const insertIndex = dst.index > src.index ? dst.index - 1 : dst.index
  arr.splice(insertIndex, 0, m)
}
function locate(list, id, parent=null){
  for(let i=0;i<list.length;i++){
    const it = list[i]
    if(it.id===id) return { parent, index: i }
    if(it.children){ const r = locate(it.children, id, list); if(r) return r }
  }
  return null
}
const rowSelection = computed(() => ({ selectedRowKeys: ctx.state.selectedKeys, onChange: (keys) => ctx.onSelect(keys), checkStrictly: true }))
</script>