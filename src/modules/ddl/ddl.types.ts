import type { ResPaginationMeta } from '@/shared/types/pagination'
import type { OptionItem } from '@/shared/types/enum'

export interface DdlState {
  divisionDdl: OptionItem[]
  roleDdl: OptionItem[]
  generalStatus: OptionItem[]
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
