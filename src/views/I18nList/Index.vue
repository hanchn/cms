<template>
  <section class="page">
    <Toolbar />
    <List />
    <CreateModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from '../I18n/components/Toolbar.vue'
import List from '../I18n/components/List.vue'
import CreateModal from '../I18n/components/CreateModal.vue'
import { fetchI18nList, createI18n, deleteI18n } from '@apis/i18n'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, createVisible: false })

async function load(){
  state.loading = true
  const res = await fetchI18nList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openCreate(){ state.createVisible = true }
async function onCreateSubmit(data){ await createI18n(data); state.createVisible = false; load() }
async function onRemove(id){ await deleteI18n(id); load() }

provide('i18n', { state, load, onPageChange, openCreate, onCreateSubmit, onRemove })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>