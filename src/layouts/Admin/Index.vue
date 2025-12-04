<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider theme="dark" width="240" collapsible v-model:collapsed="collapsed" breakpoint="lg" :collapsedWidth="64">
      <div class="brand">CMS</div>
      <SideNav :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-left">
        </div>
        <div class="header-right">
          <a-dropdown v-if="auth.loggedIn">
            <a-space>
              <a-avatar :src="auth.user?.avatar" size="small" />
              <span>{{ auth.user?.name }}</span>
            </a-space>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile"><RouterLink to="/dashboard">个人中心</RouterLink></a-menu-item>
                <a-menu-item key="logout" @click="logout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button v-else type="primary" size="small" @click="login">登录</a-button>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
  </template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideNav from './components/SideNav.vue'
import { useAuthStore } from '@stores/auth'
const collapsed = ref(false)
const auth = useAuthStore()
const router = useRouter()
function login(){ router.push('/login') }
function logout(){ auth.logout(); localStorage.removeItem('token'); router.replace('/login') }
</script>

<style scoped>
.brand { color: #fff; font-weight: 600; margin: 16px 16px 12px; }
.header { background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; }
.header-left { display: flex; align-items: center; gap: 8px; }
.header-right { display: flex; align-items: center; gap: 12px; }
.header-right :deep(.ant-avatar) { box-shadow: 0 0 0 1px rgba(255,255,255,0.3); }
.content { background: #fff; padding: 24px; margin: 20px; border-radius: 8px; min-height: calc(100vh - 64px - 40px); }
</style>