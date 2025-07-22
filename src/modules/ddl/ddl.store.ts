import { defineStore } from 'pinia'
import type { DdlState } from '@/modules/ddl/ddl.types'
import type { OptionItem } from '@/shared/types/enum'

export const useDdlStore = defineStore('ola-hr-ddl', {
  state: (): DdlState => ({
    divisionDdl: [],
    roleDdl: [],
    genders: [
      { label: 'Male', value: 'MALE', disabled: false },
      { label: 'Female', value: 'FEMALE', disabled: false }
    ],
    generalStatus: [
      { label: 'Active', value: 1, disabled: false },
      { label: 'Inactive', value: 0, disabled: false }
    ],
    employmentStatus: [
      { label: 'Permanent', value: 'PERMANENT', disabled: false },
      { label: 'Contract', value: 'CONTRACT', disabled: false },
      { label: 'Internship', value: 'INTERNSHIP', disabled: false }
    ]
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
