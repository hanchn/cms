import { defineStore } from 'pinia'
import { layoutEnabled } from '../config/layout'

export const useLayoutStore = defineStore('layout', {
  state: () => ({ enabled: layoutEnabled, noLayoutPages: [] }),
  actions: {
    setNav(items) {
      this.noLayoutPages = (items || []).filter(i => i.layout === false).map(i => i.key)
    },
    setEnabled(val) { this.enabled = !!val }
  }
})