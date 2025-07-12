import http from '@/lib/http/axios'
import type {
  ReqEmployeeList,
  ReqEmployee,
  ResEmployeeList,
  ResEmployeeDetail
} from '@/modules/employee/employee.types'

export const getEmployeeListApi = (params: ReqEmployeeList) => {
  return http.get<ResEmployeeList>('/api/employees', params)
}

export const getEmployeeDetailApi = (id: number) => {
  return http.get<ResEmployeeDetail>(`/api/employees/${id}`)
}

export const updateEmployeeApi = (id: number, params: ReqEmployee) => {
  return http.put<null>(`/api/employees/${id}`, params)
}

export const createEmployeeApi = (params: ReqEmployee) => {
  return http.post<null>('/api/employees', params)
}

export const deleteEmployeeApi = (id: number) => {
  return http.delete<null>(`/api/employees/${id}`)
}
