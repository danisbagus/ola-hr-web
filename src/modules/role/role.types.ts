import type { ResPaginationMeta } from '@/shared/types/pagination'

export interface RoleState {
  roleList: RoleList[]
  roleDetail: ResRoleDetail | null
  roleListPagination: ResPaginationMeta
  roleListParams: ReqRoleList
}

export interface ReqRoleList {
  keyword: string
  is_active: number | null
  page: number
  size: number
}

export interface ReqRole {
  name: string
  is_active: boolean
  module_ids: number[]
}

export interface RoleList {
  id: number
  name: string
  modules: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResRoleList {
  roles: RoleList[]
  pagination: ResPaginationMeta
}

export interface ResRoleDetail {
  id: number
  name: string
  module_ids: number[]
  is_active: boolean
  created_at: string
  updated_at: string
}
