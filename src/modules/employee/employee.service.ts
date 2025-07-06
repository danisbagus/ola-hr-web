import http from '@/lib/http/axios'
import type {
  ReqEmployeeList,
  ResEmployeeList,
  ResEmployeeDetail
} from '@/modules/employee/employee.types'

export const getEmployeeListApi = (params: ReqEmployeeList) => {
  return http.get<ResEmployeeList>('/api/employees', params)
}

export const getEmployeeDetailApi = (id: number) => {
  return http.get<ResEmployeeDetail>(`/api/employees/${id}`)
}
