<template>
  <section class="page">
    <Toolbar />
    <List />
    <CreateModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from '../Track/components/Toolbar.vue'
import List from '../Track/components/List.vue'
import CreateModal from '../Track/components/CreateModal.vue'
import { fetchTrackList, createTrack, deleteTrack } from '@apis/track'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, createVisible: false })

async function load(){
  state.loading = true
  const res = await fetchTrackList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openCreate(){ state.createVisible = true }
async function onCreateSubmit(data){ await createTrack(data); state.createVisible = false; load() }
async function onRemove(id){ await deleteTrack(id); load() }

provide('track', { state, load, onPageChange, openCreate, onCreateSubmit, onRemove })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>