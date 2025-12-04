<template>
  <div>
    <a-list :loading="ctx.state.loading" :data-source="ctx.state.items" :grid="grid" :pagination="false">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card :hoverable="true" :bodyStyle="{ padding: 0 }">
            <div class="thumb">
              <video :src="item.src" :poster="item.cover" class="video" controls />
            </div>
            <div class="meta">
              <span class="name">{{ item.name }}</span>
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <div style="margin-top:12px; display:flex; justify-content:flex-end">
      <a-pagination :current="ctx.state.page" :pageSize="ctx.state.pageSize" :total="ctx.state.total" showSizeChanger @change="onPage" @showSizeChange="onSize" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const ctx = inject('materialVideo')
const grid = computed(() => ({ gutter: 20, column: ctx.state.view==='big' ? 5 : 8 }))
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>

<style scoped>
.thumb { width: 100%; aspect-ratio: 16 / 9; }
.video { width: 100%; height: 100%; object-fit: cover; display: block; }
.meta { margin-top: 20px; color: #667085; font-size: 12px; padding: 0 12px; }
.name { display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>