<template>
  <div class="toolbar">
    <a-space>
      <a-radio-group v-model:value="view" @change="onView">
        <a-radio-button value="big">大图模式</a-radio-button>
        <a-radio-button value="small">小图模式</a-radio-button>
      </a-radio-group>
      <a-button type="primary" @click="ctx.openUpload()">上传视频</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const ctx = inject('materialVideo')
const view = computed({ get: () => ctx.state.view, set: (v) => ctx.setView(v) })
function onView(){ }
</script>

<style scoped>
.toolbar { margin-bottom: 16px; display: flex; justify-content: flex-end; }
</style>