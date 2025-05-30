import type { ReqEmployeeList } from '@/modules/employee/employee.types'
import employeeList from '@/assets/json/employeeList.json'

export const getEmployeeListApi = (params: ReqEmployeeList) => {
  return employeeList
}
