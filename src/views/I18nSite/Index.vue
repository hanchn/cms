<template>
  <section class="page">
    <Toolbar />
    <List />
    <CreateModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from './components/Toolbar.vue'
import List from './components/List.vue'
import CreateModal from './components/CreateModal.vue'
import { fetchSiteLanguageList, createSiteLanguage, updateSiteLanguage, deleteSiteLanguage } from '@apis/i18nSite'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, createVisible: false, current: null })

async function load(){
  state.loading = true
  const res = await fetchSiteLanguageList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openCreate(){ state.current = null; state.createVisible = true }
function openEdit(record){ state.current = record; state.createVisible = true }
async function onCreateSubmit(data){
  if(state.current && state.current.id){ await updateSiteLanguage(state.current.id, data) } else { await createSiteLanguage(data) }
  state.createVisible = false
  load()
}
async function onRemove(id){ await deleteSiteLanguage(id); load() }

provide('i18nSite', { state, load, onPageChange, openCreate, openEdit, onCreateSubmit, onRemove })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>