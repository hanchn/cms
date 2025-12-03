import { defineStore } from 'pinia'
import { layoutEnabled } from '../config/layout'

export const useLayoutStore = defineStore('layout', {
  state: () => ({ enabled: layoutEnabled, noLayoutPages: [] }),
  actions: {
    setNav(items) {
      const res = []
      const walk = (arr) => {
        (arr || []).forEach(i => {
          if (i.layout === false && i.key) res.push(i.key)
          if (i.children && i.children.length) walk(i.children)
        })
      }
      walk(items || [])
      this.noLayoutPages = res
    },
    setEnabled(val) { this.enabled = !!val }
  }
})