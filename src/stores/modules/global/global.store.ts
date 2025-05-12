import { defineStore } from 'pinia'
import type { GlobalState } from '@/stores/interface'
import { DEFAULT_PRIMARY } from '@/config'
import piniaPersistConfig from '@/stores/helper/persist'

export const useGlobalStore = defineStore('ola-hr-global', {
  state: (): GlobalState => ({
    isCollapse: false,
    accordion: true,
    breadcrumb: true,
    breadcrumbIcon: true,
    footer: true
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
