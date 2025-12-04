<template>
  <section class="page ide">
    <Toolbar />
    <div class="work">
      <List />
    </div>
  </section>
</template>

<script setup>
import { reactive, provide, onMounted } from 'vue'
import Toolbar from './components/Toolbar.vue'
import List from './components/List.vue'
import { fetchTemplateList } from '@apis/material/template'

const state = reactive({ list: [], page: 1, pageSize: 10, total: 0 })

async function loadList(){
  const res = await fetchTemplateList()
  state.list = res.items || []
  state.total = state.list.length
  
}

function remove(id){
  state.list = state.list.filter(i => i.id !== id)
  state.total = state.list.length
}

provide('materialTemplate', { state, loadList, remove })

onMounted(loadList)
</script>

<style scoped>
.ide { width: 100%; }
.work { display: block; }
</style>