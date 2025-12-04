<template>
  <a-modal :open="ctx.state.uploadVisible" title="上传视频" okText="上传" cancelText="取消" @ok="submit" @cancel="ctx.state.uploadVisible=false" destroyOnClose>
    <a-upload list-type="text" :multiple="true" accept="video/*" :before-upload="beforeUpload" :file-list="fileList">
      <div>
        <span>选择视频</span>
      </div>
    </a-upload>
  </a-modal>
</template>

<script setup>
import { inject, ref } from 'vue'
const ctx = inject('materialVideo')
const fileList = ref([])
function beforeUpload(file){ fileList.value = [...fileList.value, file]; return false }
async function submit(){ await ctx.onUpload(fileList.value); fileList.value = [] }
</script>