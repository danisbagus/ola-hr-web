import type { Ddl } from '@/modules/ddl/ddl.types'
import type { OptionItem } from '@/shared/types/enum'

export function transformToOptionItem(ddl: Ddl): OptionItem {
  return {
    label: ddl.name,
    value: ddl.id,
    disabled: true
  }
}
