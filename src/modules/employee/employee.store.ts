import { defineStore } from 'pinia'
import type { EmployeeState, EmployeeList } from '@/modules/employee/employee.types'
import type { ResPaginationMeta } from '@/shared/types/pagination'

export const useEmployeeStore = defineStore('ola-hr-employee', {
  state: (): EmployeeState => ({
    employeeList: [],
    paginationEmployeeList: {
      page: 1,
      size: 10,
      total_data: 0,
      total_page: 0
    }
  }),
  getters: {},

  actions: {
    setEmployeeList(data: EmployeeList[]) {
      this.employeeList = data
    },

    setPaginationEmployeeList(data: ResPaginationMeta) {
      this.paginationEmployeeList = data
    }
  }
})
