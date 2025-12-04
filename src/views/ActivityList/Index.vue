<template>
  <section class="page">
    <Toolbar />
    <List />
    <CreateModal />
    <ScheduleModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from './components/Toolbar.vue'
import List from './components/List.vue'
import CreateModal from './components/CreateModal.vue'
import ScheduleModal from './components/ScheduleModal.vue'
import { fetchActivityList, createActivity, scheduleActivity, deleteActivity } from '@apis/activity'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 10, loading: false, createVisible: false, scheduleVisible: false, current: null })

async function load(){
  state.loading = true
  const res = await fetchActivityList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openCreate(){ state.createVisible = true }
async function onCreateSubmit(data){ await createActivity(data); state.createVisible = false; load() }
function openSchedule(record){ state.current = record; state.scheduleVisible = true }
async function onScheduleSubmit(data){ await scheduleActivity({ id: state.current?.id, ...data }); state.scheduleVisible = false; state.current = null; load() }
async function onRemove(id){ await deleteActivity(id); load() }

provide('activity', { state, load, onPageChange, openCreate, onCreateSubmit, openSchedule, onScheduleSubmit, onRemove })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>