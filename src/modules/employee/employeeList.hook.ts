import { computed, ref, reactive } from 'vue'
import { getEmployeeListApi } from '@/modules/employee/employee.service'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { EmployeeList } from '@/modules/employee/employee.types'
import type { ListComposable } from '@/shared/types/hook'

export const useEmployeeList = (): ListComposable<EmployeeList> => {
  const employeeStore = useEmployeeStore()

  const isLoading = ref(false)
  const isSuccess = ref(false)
  const errorMessage = ref('')

  const filters = reactive<Record<string, any>>({
    page: 1,
    size: 10
  })

  const fetchList = async () => {
    isLoading.value = true

    try {
      const { data } = await getEmployeeListApi({ ...filters })
      employeeStore.setEmployeeList(data.employees)
      employeeStore.setPaginationEmployeeList(data.pagination)
      isSuccess.value = true
    } catch (error) {
      isSuccess.value = false
      errorMessage.value = getErrorMessage(error)
    } finally {
      isLoading.value = false
    }
  }

  const resetFilters = () => {
    Object.keys(filters).forEach(key => {
      if (key !== 'page' && key !== 'size') {
        delete filters[key]
      }
    })

    fetchList()
  }

  const setPage = (page: number) => {
    filters.page = page
    fetchList()
  }

  const setSize = (size: number) => {
    filters.size = size
    filters.page = 1 // reset to page 1 on size change
    fetchList()
  }

  return {
    data: computed(() => employeeStore.employeeList),
    paginationMeta: computed(() => employeeStore.paginationEmployeeList),
    filters: computed(() => filters),
    fetchList,
    resetFilters,
    setPage,
    setSize,
    isSuccess,
    errorMessage
  }
}
