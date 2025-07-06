import type { ResPaginationMeta } from '@/shared/types/pagination'
import type { OptionItem } from '@/shared/types/enum'

export interface DdlState {
  divisionDdl: OptionItem[]
  roleDdl: OptionItem[]
  genders: OptionItem[]
  generalStatus: OptionItem[]
  EmploymentStatus: OptionItem[]
}

export interface ReqDdlParams {
  page?: number
  size?: number
}
export interface Ddl {
  id: number
  name: string
}

export interface ResDdl {
  ddl: Ddl[]
  pagination: ResPaginationMeta
}
