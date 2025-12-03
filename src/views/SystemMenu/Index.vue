<template>
  <section>
    <h1>菜单管理</h1>
    <a-card style="max-width: 1000px">
      <Filter @search="onSearch" />
      <List
        :items="items"
        :total="total"
        :page="page"
        :page-size="pageSize"
        @page-change="onPageChange"
        @add="onAdd"
        @edit="onEdit"
        @remove="onRemove"
      />
    </a-card>
    <EditModal
      :visible="visible"
      :record="current"
      @cancel="visible=false"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import EditModal from './components/EditModal.vue'
import { fetchMenuList, createMenu, updateMenu, deleteMenu } from '@apis/system/menu'

const items = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const query = ref({})
const visible = ref(false)
const current = ref(null)

async function load(){
  const res = await fetchMenuList({ ...query.value, page: page.value, pageSize: pageSize.value })
  items.value = res.items || []
  total.value = res.total || 0
}

function onSearch(q){ query.value = q; page.value = 1; load() }
function onPageChange(p, ps){ page.value = p; pageSize.value = ps; load() }
function onAdd(){ current.value = null; visible.value = true }
function onEdit(record){ current.value = record; visible.value = true }
async function onRemove(id){ await deleteMenu(id); load() }
async function onSubmit(data){
  if(current.value && current.value.id){ await updateMenu(current.value.id, data) } else { await createMenu(data) }
  visible.value = false
  load()
}

load()
</script>