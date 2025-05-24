import { defineStore } from 'pinia'
import type { EnumState } from '@/stores/interface'
import piniaPersistConfig from '@/stores/helper/persist'
import { fa } from 'element-plus/es/locales.mjs'

export const useEnumStore = defineStore('ola-hr-enum', {
  state: (): EnumState => ({
    generalStatusOptions: [
      { label: 'Aktif', value: true, disabled: false },
      { label: 'Tidak Aktif', value: false, disabled: false }
    ]
  }),
  getters: {
    getStatusOptions: state => state.generalStatusOptions
  },
  actions: {},
  persist: piniaPersistConfig('ola-hr-enum')
})
