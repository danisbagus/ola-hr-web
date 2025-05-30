import type { ResPaginationMeta } from '@/shared/types/pagination'

export interface EmployeeState {
  employeeList: EmployeeList[]
  paginationEmployeeList: ResPaginationMeta
}

export interface ReqEmployeeList {
  keyword?: string
  division_id?: number
  role_id?: number
  is_active?: boolean
  page?: number
  size?: number
}
export interface EmployeeList {
  id: number
  employee_id: string
  name: string
  email: string
  division: string
  role: string
  is_active: boolean
  created_at: string
}

export interface ResEmployeeList {
  employees: EmployeeList[]
  pagination: ResPaginationMeta
}
