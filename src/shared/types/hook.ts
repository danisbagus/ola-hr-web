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

export interface DetailComposable<TData = any> {
  data: Ref<TData>
  fetchDetail: () => Promise<void>
  isSuccess: Ref<boolean>
  isLoading: Ref<boolean>
  errorMessage: Ref<string>
}
