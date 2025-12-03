import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ loggedIn: false, user: { name: 'Admin', avatar: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4' } }),
  actions: {
    login(user) {
      this.loggedIn = true
      this.user = user || this.user
    },
    logout() {
      this.loggedIn = false
    }
  }
})