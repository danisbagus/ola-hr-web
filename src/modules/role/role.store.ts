import { defineStore } from 'pinia'
import type { RoleState, RoleList, ResRoleDetail } from '@/modules/role/role.types'
import type { ResPaginationMeta } from '@/shared/types/pagination'

export const useRoleStore = defineStore('ola-hr-role', {
  state: (): RoleState => ({
    roleList: [],
    roleDetail: null,
    roleListPagination: {
      page: 1,
      size: 10,
      total_data: 0,
      total_page: 0
    },
    roleListParams: {
      keyword: '',
      is_active: null,
      page: 1,
      size: 10
    }
  }),
  getters: {},

  actions: {
    setRoleList(data: RoleList[]) {
      this.roleList = data
    },

    setRoleDetail(data: ResRoleDetail | null) {
      this.roleDetail = data
    },

    setRolePagination(data: ResPaginationMeta) {
      this.roleListPagination = data
    },

    resetListParams() {
      this.roleListParams = {
        keyword: '',
        is_active: null,
        page: 1,
        size: 10
      }
    },

    setPage(page: number) {
      this.roleListParams.page = page
    },

    setSize(size: number) {
      this.roleListParams.size = size
      this.roleListParams.page = 1 // reset to page 1 on size change
    }
  }
})
