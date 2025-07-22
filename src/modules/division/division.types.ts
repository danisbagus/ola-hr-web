import type { ResPaginationMeta } from '@/shared/types/pagination'

export interface DivisionState {
  divisionList: DivisionList[]
  divisionDetail: ResDivisionDetail | null
  paginationDivisionList: ResPaginationMeta
  divisionListParams: ReqDivisionList
}

export interface ReqDivisionList {
  keyword: string
  is_active: number
  page: number
  size: number
}

export interface ReqDivision {
  name: string
  is_active: boolean
}

export interface DivisionList {
  id: number
  name: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResDivisionList {
  divisions: DivisionList[]
  pagination: ResPaginationMeta
}

export interface ResDivisionDetail {
  id: number
  name: string
  is_active: boolean
  created_at: string
  updated_at: string
}
