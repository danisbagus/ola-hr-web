import { defineStore } from 'pinia'
import type {
  EmployeeState,
  EmployeeList,
  ResEmployeeDetail
} from '@/modules/employee/employee.types'
import type { ResPaginationMeta } from '@/shared/types/pagination'

export const useEmployeeStore = defineStore('ola-hr-employee', {
  state: (): EmployeeState => ({
    employeeList: [],
    employeeDetail: null,
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

    setEmployeeDetail(data: ResEmployeeDetail | null) {
      this.employeeDetail = data
    },

    setPaginationEmployeeList(data: ResPaginationMeta) {
      this.paginationEmployeeList = data
    }
  }
})
