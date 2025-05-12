import { defineStore } from 'pinia'
import type { KeepAliveState } from '@/stores/interface'

export const useKeepAliveStore = defineStore('ola-hr-keepAlive', {
  state: (): KeepAliveState => ({
    keepAliveName: []
  }),
  actions: {
    // Set KeepAliveName
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName
    }
  }
})
