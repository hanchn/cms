<template>
  <section class="page">
    <Filter />
    <List />
    <EditModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import EditModal from './components/EditModal.vue'
import { fetchUserList, createUser, updateUser, deleteUser } from '@apis/system/user'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, query: {}, loading: false, visible: false, current: null })

async function load(){
  state.loading = true
  const res = await fetchUserList({ ...state.query, page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onSearch(q){ state.query = q; state.page = 1; load() }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function onAdd(){ state.current = null; state.visible = true }
function onEdit(record){ state.current = record; state.visible = true }
async function onRemove(id){ await deleteUser(id); load() }
async function onSubmit(data){
  if(state.current && state.current.id){ await updateUser(state.current.id, data) } else { await createUser(data) }
  state.visible = false
  load()
}

provide('systemUser', { state, load, onSearch, onPageChange, onAdd, onEdit, onRemove, onSubmit })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>