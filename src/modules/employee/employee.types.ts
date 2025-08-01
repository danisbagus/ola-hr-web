import type { ResPaginationMeta } from '@/shared/types/pagination'

export interface EmployeeState {
  employeeList: EmployeeList[]
  employeeDetail: ResEmployeeDetail | null
  employeeListPagination: ResPaginationMeta
  employeeListParams: ReqEmployeeList
}

export interface ReqEmployeeList {
  keyword: string
  division_id: number | null
  role_id: number | null
  is_active: boolean | null
  page: number
  size: number
}
export interface EmployeeList {
  id: number
  employee_number: string
  name: string
  email: string
  division: string
  role: string
  employement_status: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResEmployeeList {
  employees: EmployeeList[]
  pagination: ResPaginationMeta
}

export interface ResEmployeeDetail {
  id: number
  employee_number: string
  name: string
  email: string
  phone_number: string
  employment_status: string
  gender: string
  division_id: number
  role_id: number
  hire_date: string
  birth_date: string
  address: string
  is_active: boolean
}

export interface ReqEmployee {
  name: string
  phone_number: string
  email: string
  employment_status: string
  gender: string
  division_id: number | null
  role_id: number | null
  hire_date: string
  birth_date: string
  address: string
  is_active: boolean
}
