import type { OptionItem } from '@/shared/types/enum'

export type FilterType = 'input' | 'select'

export interface FormFilterInput {
  filterType: FilterType
  label: string
  modelValue: string | number | boolean | object | any[] | null
  options?: OptionItem[]
  props?: any
  clearable?: boolean
  placeholder?: string
  tooltip?: string
}
