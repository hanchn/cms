<template>
  <section class="page">
    <Toolbar />
    <ImageList />
    <UploadModal />
  </section>
</template>

<script setup>
import { reactive, provide } from 'vue'
import Toolbar from './components/Toolbar.vue'
import ImageList from './components/ImageList.vue'
import UploadModal from './components/UploadModal.vue'
import { fetchImageList, uploadImage } from '@apis/material/image'

const state = reactive({ items: [], total: 0, page: 1, pageSize: 12, view: 'big', uploadVisible: false, loading: false })

async function load(){
  state.loading = true
  const res = await fetchImageList({ page: state.page, pageSize: state.pageSize })
  state.items = res.items || []
  state.total = res.total || 0
  state.loading = false
}

function setView(v){ state.view = v }
function onPageChange(p, ps){ state.page = p; state.pageSize = ps; load() }
function openUpload(){ state.uploadVisible = true }
async function onUpload(files){
  for(const f of files){ await uploadImage(f, { biz: 'image' }) }
  state.uploadVisible = false
  load()
}

provide('materialImage', { state, setView, onPageChange, openUpload, onUpload })

load()
</script>

<style scoped>
.page { width: 100%; }
</style>