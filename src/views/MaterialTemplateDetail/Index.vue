<template>
  <section class="page ide">
    <Toolbar />
    <div class="work">
      <Editor />
      <Preview />
    </div>
  </section>
</template>

<script setup>
import { reactive, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Toolbar from './components/Toolbar.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import { fetchTemplate, saveTemplate } from '@apis/material/template'

const route = useRoute()
const state = reactive({ currentId: null, name: '', content: '', loading: false, saving: false })

async function load(){
  const id = Number(route.query.id)
  if(!id) return
  state.loading = true
  const res = await fetchTemplate(id)
  state.currentId = id
  state.name = res.name || ''
  state.content = res.content || ''
  state.loading = false
}

async function save(){ state.saving = true; await saveTemplate({ id: state.currentId, name: state.name, content: state.content }); state.saving = false }

provide('materialTemplateDetail', { state, save })
onMounted(load)
</script>

<style scoped>
.ide { width: 100%; }
.work { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
</style>