import type { Ref } from 'vue'
import type { ResPaginationMeta } from '@/shared/types/pagination'

export interface ListComposable<TData = any> {
  data: Ref<TData[]>
  paginationMeta: Ref<ResPaginationMeta>
  filters: Ref<{ [key: string]: any }>
  fetchList: () => Promise<void>
  resetFilters: () => void
  setPage: (page: number) => void
  setSize: (size: number) => void
  isSuccess: Ref<boolean>
  errorMessage: Ref<string>
}
