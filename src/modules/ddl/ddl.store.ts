import { defineStore } from 'pinia'
import type { DdlState } from '@/modules/ddl/ddl.types'
import type { OptionItem } from '@/shared/types/enum'

export const useDdlStore = defineStore('ola-hr-ddl', {
  state: (): DdlState => ({
    divisionDdl: [],
    roleDdl: []
  }),
  getters: {},
  actions: {
    setDdlDivision(ddl: OptionItem[]) {
      this.divisionDdl = ddl
    },

    setDdlRole(ddl: OptionItem[]) {
      this.roleDdl = ddl
    }
  }
})
