import { defineStore } from 'pinia'
import type {
  DivisionState,
  DivisionList,
  ResDivisionDetail
} from '@/modules/division/division.types'
import type { ResPaginationMeta } from '@/shared/types/pagination'

export const useDivisionStore = defineStore('ola-hr-division', {
  state: (): DivisionState => ({
    divisionList: [],
    divisionDetail: null,
    divisionListPagination: {
      page: 1,
      size: 10,
      total_data: 0,
      total_page: 0
    },
    divisionListParams: {
      keyword: '',
      is_active: null,
      page: 1,
      size: 10
    }
  }),
  getters: {},

  actions: {
    setDivisionList(data: DivisionList[]) {
      this.divisionList = data
    },

    setDivisionDetail(data: ResDivisionDetail | null) {
      this.divisionDetail = data
    },

    setDivisionPagination(data: ResPaginationMeta) {
      this.divisionListPagination = data
    },

    resetListParams() {
      this.divisionListParams = {
        keyword: '',
        is_active: null,
        page: 1,
        size: 10
      }
    },

    setPage(page: number) {
      this.divisionListParams.page = page
    },

    setSize(size: number) {
      this.divisionListParams.size = size
      this.divisionListParams.page = 1 // reset to page 1 on size change
    }
  }
})
