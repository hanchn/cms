<template>
  <a-modal :open="ctx.state.uploadVisible" title="上传图片" okText="上传" cancelText="取消" @ok="submit" @cancel="ctx.state.uploadVisible=false" destroyOnClose>
    <a-upload list-type="picture-card" :multiple="true" :before-upload="beforeUpload" :file-list="fileList">
      <div>
        <span>选择图片</span>
      </div>
    </a-upload>
  </a-modal>
</template>

<script setup>
import { inject, ref } from 'vue'
const ctx = inject('materialImage')
const fileList = ref([])
function beforeUpload(file){ fileList.value = [...fileList.value, file]; return false }
async function submit(){ await ctx.onUpload(fileList.value); fileList.value = [] }
</script>