<template>
  <div class="login-wrap">
    <a-card class="login-card" title="登录" :bordered="false">
      <a-tabs v-model:activeKey="active">
        <a-tab-pane key="scan" tab="扫码登录">
          <div class="qr-box">
            <div class="qr"></div>
            <div class="hint">请使用手机扫码登录</div>
            <a-space style="margin-top:12px">
              <a-button type="primary" @click="mockScan">模拟扫码成功</a-button>
            </a-space>
          </div>
        </a-tab-pane>
        <a-tab-pane key="account" tab="账号密码">
          <a-form :model="form" layout="vertical" @submit.prevent>
            <a-form-item label="用户名">
              <a-input v-model:value="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input v-model:value="form.password" type="password" placeholder="请输入密码" />
            </a-form-item>
            <a-button type="primary" block @click="loginByAccount">登录</a-button>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@stores/auth'

const router = useRouter()
const auth = useAuthStore()
const active = ref('scan')
const form = ref({ username: '', password: '' })

function finishLogin() {
  localStorage.setItem('token', 'mock-token')
  auth.login({ name: form.value.username || 'Admin', avatar: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4' })
  router.replace('/dashboard')
}

function mockScan(){ finishLogin() }
function loginByAccount(){ finishLogin() }
</script>

<style scoped>
.login-wrap { display: grid; place-items: center; min-height: 100vh; background: #f5f7fa; }
.login-card { width: 360px; }
.qr-box { display: flex; flex-direction: column; align-items: center; }
.qr { width: 180px; height: 180px; background: repeating-linear-gradient(45deg,#111 0 6px,#fff 6px 12px); border: 8px solid #111; }
.hint { margin-top: 8px; color: #64748b; }
</style>