<template>
  <section class="page ide">
    <Toolbar />
    <div class="work">
      <List />
      <div class="editor-preview">
        <Editor />
        <Preview />
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, provide, onMounted } from 'vue'
import Toolbar from './components/Toolbar.vue'
import List from './components/List.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import { fetchFloorTemplateList, fetchFloorTemplate, saveFloorTemplate } from '@apis/material/floorTemplate'

const state = reactive({ list: [], currentId: null, name: '', content: '<div style="padding:24px">楼层模板示例</div>', loading: false, saving: false, page: 1, pageSize: 10, total: 0 })

async function loadList(){ const res = await fetchFloorTemplateList(); state.list = res.items || []; state.total = state.list.length; if(state.list.length){ select(state.list[0].id) } }
async function select(id){ state.loading = true; const res = await fetchFloorTemplate(id); state.currentId = id; state.name = res.name || ''; state.content = res.content || ''; state.loading = false }
async function save(){ state.saving = true; await saveFloorTemplate({ id: state.currentId, name: state.name, content: state.content }); state.saving = false }

function remove(id){ state.list = state.list.filter(i => i.id !== id); state.total = state.list.length; if(state.currentId===id){ const first = state.list[0]; if(first) select(first.id) } }
provide('floorTemplate', { state, loadList, select, save, remove })
onMounted(loadList)
</script>

<style scoped>
.ide { width: 100%; }
.work { display: grid; grid-template-columns: 1.1fr 1.4fr; gap: 20px; }
.editor-preview { display: grid; grid-template-rows: 1fr 1fr; gap: 20px; }
</style>