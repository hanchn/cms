<template>
  <section>
    <h1>菜单管理</h1>
    <a-card style="max-width: 1000px">
      <Filter />
      <List />
    </a-card>
    <EditModal />
  </section>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import EditModal from './components/EditModal.vue'
import { fetchMenuList, createMenu, updateMenu, deleteMenu } from '@apis/system/menu'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, query: {}, visible: false, current: null })

async function load(){
  const res = await fetchMenuList({ ...state.query, page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
}

function onSearch(q){ state.query = q; state.page = 1; load() }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function onAdd(){ state.current = null; state.visible = true }
function onEdit(record){ state.current = record; state.visible = true }
async function onRemove(id){ await deleteMenu(id); load() }
async function onSubmit(data){
  if(state.current && state.current.id){ await updateMenu(state.current.id, data) } else { await createMenu(data) }
  state.visible = false
  load()
}

provide('systemMenu', { state, onSearch, onPageChange, onAdd, onEdit, onRemove, onSubmit })

load()
</script>