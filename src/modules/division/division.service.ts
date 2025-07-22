import http from '@/lib/http/axios'
import type {
  ReqDivision,
  ReqDivisionList,
  ResDivisionList,
  ResDivisionDetail
} from './division.types'

export const getDivisionListApi = (params: ReqDivisionList) => {
  return http.get<ResDivisionList>('/api/divisions', params)
}

export const getDivisionDetailApi = (id: number) => {
  return http.get<ResDivisionDetail>(`/api/divisions/${id}`)
}

export const updateDivisionApi = (id: number, params: ReqDivision) => {
  return http.put<null>(`/api/divisions/${id}`, params)
}
