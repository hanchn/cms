<template>
  <a-modal :open="ctx.state.uploadVisible" title="上传图片" okText="上传" cancelText="取消" @ok="submit" @cancel="ctx.state.uploadVisible=false" destroyOnClose>
    <a-upload list-type="picture-card" :multiple="true" accept="image/*" :before-upload="beforeUpload">
      <div>
        <span>选择图片</span>
      </div>
    </a-upload>
    <a-table :dataSource="rows" :columns="columns" :rowKey="rowKey" :pagination="false" style="margin-top:12px" />
  </a-modal>
</template>

<script setup>
import { inject, ref, reactive } from 'vue'
const ctx = inject('materialImage')
const rows = reactive([])
function rowKey(r){ return r.uid }
const columns = [
  { title: '文件', dataIndex: 'filename', key: 'filename' },
  { title: '图片名称', dataIndex: 'name', key: 'name', customRender: ({ record }) => h('input', { value: record.name || '', onInput: e => record.name = e.target.value, class: 'ant-input' }) },
  { title: '尺寸', dataIndex: 'size', key: 'size' },
  { title: '比例', dataIndex: 'ratio', key: 'ratio' }
]
function beforeUpload(file){ addFile(file); return false }
function addFile(file){
  const item = { uid: file.uid || Date.now()+Math.random(), file, filename: file.name, name: '', width: 0, height: 0, size: '', ratio: '' }
  rows.push(item)
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => {
    item.width = img.naturalWidth
    item.height = img.naturalHeight
    item.size = `${item.width}x${item.height}`
    item.ratio = (item.width && item.height) ? (item.width / item.height).toFixed(2) : ''
    URL.revokeObjectURL(url)
  }
  img.src = url
}
async function submit(){ const files = rows.map(r => Object.assign(r.file, { nameOverride: r.name, width: r.width, height: r.height })); await ctx.onUpload(files); rows.splice(0, rows.length) }
</script>