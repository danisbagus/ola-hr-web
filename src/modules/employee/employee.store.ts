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
    employeeListPagination: {
      page: 1,
      size: 10,
      total_data: 0,
      total_page: 0
    },
    employeeListParams: {
      keyword: '',
      division_id: null,
      role_id: null,
      is_active: null,
      page: 1,
      size: 10
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

    setemployeeListPagination(data: ResPaginationMeta) {
      this.employeeListPagination = data
    },

    resetListParams() {
      this.employeeListParams = {
        keyword: '',
        is_active: null,
        division_id: null,
        role_id: null,
        page: 1,
        size: 10
      }
    },

    setPage(page: number) {
      this.employeeListParams.page = page
    },

    setSize(size: number) {
      this.employeeListParams.size = size
      this.employeeListParams.page = 1
    }
  }
})
