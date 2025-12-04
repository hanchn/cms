<template>
  <div ref="el" :style="{ height }"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'

const props = defineProps({
  modelValue: { type: String, default: '' },
  language: { type: String, default: 'html' },
  height: { type: String, default: '300px' }
})
const emit = defineEmits(['update:modelValue'])
const el = ref(null)
let editor = null

onMounted(() => {
  editor = monaco.editor.create(el.value, {
    value: props.modelValue || '',
    language: props.language || 'html',
    automaticLayout: true,
    wordWrap: 'on',
    minimap: { enabled: false },
    theme: 'vs-dark'
  })
  editor.onDidChangeModelContent(() => {
    const val = editor.getValue()
    emit('update:modelValue', val)
  })
})

watch(() => props.modelValue, (val) => {
  if (editor && val !== editor.getValue()) editor.setValue(val || '')
})

watch(() => props.language, (lang) => {
  if (editor) monaco.editor.setModelLanguage(editor.getModel(), lang || 'html')
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
    editor = null
  }
})
</script>