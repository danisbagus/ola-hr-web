import { defineStore } from 'pinia'
import type { GlobalState } from '@/modules/global/global.types'
import piniaPersistConfig from '@/lib/pinia/persist'

export const useGlobalStore = defineStore('ola-hr-global', {
  state: (): GlobalState => ({
    isCollapse: false
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: piniaPersistConfig('ola-hr-global')
})
