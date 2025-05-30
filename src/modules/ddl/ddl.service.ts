import type { ReqDdlParams, ResDdl } from '@/modules/ddl/ddl.types'
import http from '@/lib/http/axios'

export const getDivisionDdlApi = (params: ReqDdlParams) => {
  return http.get<ResDdl>('/api/ddl/divisions', params)
}

export const getRoleDdlApi = (params: ReqDdlParams) => {
  return http.get<ResDdl>('/api/ddl/roles', params)
}
