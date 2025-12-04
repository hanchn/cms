<template>
  <div>
    <a-list :loading="ctx.state.loading" :data-source="ctx.state.items" :grid="grid" :pagination="false">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card :hoverable="true" :bodyStyle="{ padding: ctx.state.view==='big' ? '12px' : '8px' }">
            <a-image :src="item.src" :width="ctx.state.view==='big' ? 220 : 140" :height="ctx.state.view==='big' ? 220 : 140" :preview="true" />
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
const ctx = inject('materialImage')
const grid = computed(() => ({ gutter: 16, column: ctx.state.view==='big' ? 4 : 6 }))
function onPage(p){ ctx.onPageChange(p, ctx.state.pageSize) }
function onSize(p, ps){ ctx.onPageChange(p, ps) }
</script>

<style scoped>
.meta { margin-top: 8px; color: #64748b; }
.name { display: inline-block; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>