import http from '@/lib/http/axios'
import type { ReqRole, ReqRoleList, ResRoleList, ResRoleDetail } from '@/modules/role/role.types'

export const getRoleListApi = (params: ReqRoleList) => {
  return http.get<ResRoleList>('/api/roles', params)
}

export const getRoleDetailApi = (id: number) => {
  return http.get<ResRoleDetail>(`/api/roles/${id}`)
}

export const updateRoleApi = (id: number, params: ReqRole) => {
  return http.put<null>(`/api/roles/${id}`, params)
}

export const createRoleApi = (params: ReqRole) => {
  return http.post<null>('/api/roles', params)
}

export const deleteRoleApi = (id: number) => {
  return http.delete<null>(`/api/roles/${id}`)
}

export const deleteBatchRoleApi = (ids: number[]) => {
  return http.post<null>(`/api/roles/delete-batch`, { ids })
}
