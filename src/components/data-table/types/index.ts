import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type TypeProps = 'selection'

export interface DataTable<T = any> {
  columns: ColumnProps[]
  dataSource: T[]
  rowKey?: string
}

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, 'type'>> {
  type?: TypeProps
  fieldNames?: FieldNamesProps
  render?: (scope: RenderScope<T>) => VNode | string
}

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export type RenderScope<T> = {
  row: T // Data baris saat ini
  $index: number // Indeks baris saat ini
  column: TableColumnCtx<T> // Informasi kolom terkait (misalnya, prop, label, dll.)
  [key: string]: any // Untuk properti tambahan (opsional)
}
