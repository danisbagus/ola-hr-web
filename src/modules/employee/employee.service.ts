import http from '@/lib/http/axios'
import type {
  ReqEmployeeList,
  ReqUpdateEmployee,
  ResEmployeeList,
  ResEmployeeDetail
} from '@/modules/employee/employee.types'

export const getEmployeeListApi = (params: ReqEmployeeList) => {
  return http.get<ResEmployeeList>('/api/employees', params)
}

export const getEmployeeDetailApi = (id: number) => {
  return http.get<ResEmployeeDetail>(`/api/employees/${id}`)
}

export const updateEmployeeApi = (id: number, params: ReqUpdateEmployee) => {
  return http.put<null>(`/api/employees/${id}`, params)
}
