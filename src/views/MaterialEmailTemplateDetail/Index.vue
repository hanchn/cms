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
import { fetchEmailTemplate, saveEmailTemplate } from '@apis/material/emailTemplate'

const route = useRoute()
const state = reactive({ currentId: null, name: '', content: '', html: '', css: '', js: '', loading: false, saving: false })
async function load(){
  const id = Number(route.query.id)
  if(!id) return
  state.loading = true
  const res = await fetchEmailTemplate(id)
  state.currentId = id
  state.name = res.name || ''
  state.content = res.content || ''
  const cssMatch = res.content?.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
  const jsMatch = res.content?.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
  state.css = cssMatch ? cssMatch[1] : ''
  state.js = jsMatch ? jsMatch[1] : ''
  state.html = res.content?.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '').replace(/<script[^>]*>[\s\S]*?<\/script>/i, '') || ''
  state.loading=false
}
async function save(){
  state.saving = true
  const css = state.css ? `<style>${state.css}</style>` : ''
  const js = state.js ? `<script>${state.js}</script>` : ''
  const content = `${css}${state.html || ''}${js}`
  await saveEmailTemplate({ id: state.currentId, name: state.name, content })
  state.saving = false
}
provide('emailTemplateDetail', { state, save })
onMounted(load)
</script>

<style scoped>
.ide { width: 100%; }
.work { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
</style>