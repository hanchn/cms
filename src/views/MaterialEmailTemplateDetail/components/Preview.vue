<template>
  <div class="preview">
    <iframe class="frame" :srcdoc="ctx.state.content"></iframe>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const ctx = inject('emailTemplateDetail')
</script>

<style scoped>
.preview { width: 100%; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; }
.frame { width: 100%; height: 600px; background: #fff; }
</style>