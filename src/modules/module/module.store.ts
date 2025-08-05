import { defineStore } from 'pinia'
import type { ModuleState, Module } from '@/modules/module/module.types'

export const useModuleStore = defineStore('ola-hr-module', {
  state: (): ModuleState => ({
    moduleList: []
  }),
  getters: {},
  actions: {
    async setModuleList(data: Module[]) {
      this.moduleList = data
    }
  }
})
