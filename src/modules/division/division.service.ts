import http from '@/lib/http/axios'
import type { ReqDivisionList, ResDivisionList } from './division.types'

export const getDivisionListApi = (params: ReqDivisionList) => {
  return http.get<ResDivisionList>('/api/divisions', params)
}
