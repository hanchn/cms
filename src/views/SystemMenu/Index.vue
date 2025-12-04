<template>
  <section class="page">
    <Filter />
    <List />
    <BatchDeleteConfirm />
    <EditModal />
  </section>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import { initialMenuItems } from './initData'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import EditModal from './components/EditModal.vue'
import BatchDeleteConfirm from './components/BatchDeleteConfirm.vue'
import { fetchMenuList, createMenu, updateMenu, deleteMenu } from '@apis/system/menu'

const state = reactive({ items: [...initialMenuItems], total: initialMenuItems.length, page: 1, pageSize: 10, query: {}, visible: false, current: null, currentParent: null, selectedKeys: [], batchMode: null, confirmVisible: false })

async function load(){
  const res = await fetchMenuList({ ...state.query, page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
}

function onSearch(q){ state.query = q; state.page = 1; load() }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function onAdd(){ state.current = null; state.visible = true }
function onEdit(record){ state.current = record; state.visible = true }
function onAddChild(parent){ state.currentParent = parent; state.current = null; state.visible = true }
function onSelect(keys){ state.selectedKeys = keys }
function onBatchAdd(){ state.batchMode = 'add'; state.visible = true }
function onBatchEdit(){ state.batchMode = 'edit'; state.visible = true }
function onBatchDeleteAsk(){ state.confirmVisible = true }
async function onBatchDelete(){ const ids = state.selectedKeys.slice(); removeByIds(state.items, ids); state.selectedKeys = []; state.total = calcTotal(state.items); state.confirmVisible = false }
async function onRemove(id){ await deleteMenu(id); load() }
async function onSubmit(data){
  if(state.batchMode === 'edit' && state.selectedKeys.length){ state.selectedKeys.forEach(id => { const node = findById(state.items, id); if(node){ node.name = data.name ?? node.name; node.path = data.path ?? node.path; node.type = data.type ?? node.type; node.status = data.status ?? node.status; node.order = data.order ?? node.order } }); state.batchMode=null; state.visible=false; return }
  if(state.current && state.current.id){ await updateMenu(state.current.id, data) }
  else if(state.currentParent){ await createMenu({ ...data, parentId: state.currentParent.id });
    const parent = findById(state.items, state.currentParent.id)
    if(parent){ parent.children = parent.children || []; parent.children.push({ id: Date.now(), ...data }) }
  } else { await createMenu(data); state.items.push({ id: Date.now(), ...data }) }
  if(state.batchMode === 'add' && state.selectedKeys.length){
    state.selectedKeys.forEach(id => {
      const parent = findById(state.items, id)
      if(parent){
        parent.children = parent.children || []
        const count = Number(data.batchCount || 1)
        for(let i=0;i<count;i++){
          parent.children.push({ id: Date.now()+Math.random(), name: data.name, path: data.path, type: data.type, status: data.status, order: data.order })
        }
      }
    })
    state.batchMode=null
  }
  state.total = calcTotal(state.items)
  state.visible = false
}

provide('systemMenu', { state, onSearch, onPageChange, onAdd, onEdit, onAddChild, onSelect, onBatchAdd, onBatchEdit, onBatchDeleteAsk, onBatchDelete, onRemove, onSubmit })

load()

function findById(list, id){
  for(const item of list){
    if(item.id === id) return item
    if(item.children){ const r = findById(item.children, id); if(r) return r }
  }
  return null
}
function removeByIds(list, ids){
  for(let i=list.length-1;i>=0;i--){
    const it = list[i]
    if(ids.includes(it.id)){ list.splice(i,1); continue }
    if(it.children) removeByIds(it.children, ids)
  }
}
function calcTotal(list){
  let n = 0
  const walk = (arr)=>{ for(const it of arr){ n++; if(it.children) walk(it.children) } }
  walk(list)
  return n
}
</script>

<style scoped>
.page { width: 100%; }
</style>