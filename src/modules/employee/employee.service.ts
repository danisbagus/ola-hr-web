import http from '@/lib/http/axios'
import type { ReqEmployeeList, ResEmployeeList } from '@/modules/employee/employee.types'

export const getEmployeeListApi = (params: ReqEmployeeList) => {
  return http.get<ResEmployeeList>('/api/employees', params)
}
