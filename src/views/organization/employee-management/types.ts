import type { ResEmployeeDetail } from '@/modules/employee/employee.types'

export interface FormProps {
  data: ResEmployeeDetail
  rules: { [key: string]: string }
}

export interface DrawerProps {
  visible: boolean
  id: number
  title: string
}
