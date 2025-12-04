<template>
  <div class="toolbar">
    <a-space>
      <a-radio-group v-model:value="view" @change="onView">
        <a-radio-button value="big">大图模式</a-radio-button>
        <a-radio-button value="small">小图模式</a-radio-button>
      </a-radio-group>
      <a-button type="primary" @click="ctx.openUpload()">上传图片</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const ctx = inject('materialImage')
const view = computed({ get: () => ctx.state.view, set: (v) => ctx.setView(v) })
function onView(){ /* already bound via computed setter */ }
</script>

<style scoped>
.toolbar { margin-bottom: 16px; }
</style>