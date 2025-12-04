<template>
  <section class="page">
    <Toolbar />
    <VideoList />
    <UploadModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from './components/Toolbar.vue'
import VideoList from './components/VideoList.vue'
import UploadModal from './components/UploadModal.vue'
import { fetchVideoList, uploadVideo } from '@apis/material/video'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 12, view: 'big', uploadVisible: false, loading: false })

async function load(){
  state.loading = true
  const res = await fetchVideoList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function setView(v){ state.view = v }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openUpload(){ state.uploadVisible = true }
async function onUpload(files){
  for(const f of files){ await uploadVideo(f, { biz: 'video' }) }
  state.uploadVisible = false
  load()
}

provide('materialVideo', { state, setView, onPageChange, openUpload, onUpload })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>