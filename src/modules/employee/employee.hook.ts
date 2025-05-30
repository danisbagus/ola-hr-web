import { computed, reactive, ref } from 'vue'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import { getEmployeeListApi } from '@/modules/employee/employee.service'
import type { ReqEmployeeList } from '@/modules/employee/employee.types'

export function useEmployee() {
  const employeeStore = useEmployeeStore()

  const employeeListParams = reactive<ReqEmployeeList>({
    keyword: '',
    division_id: 0,
    role_id: 0,
    is_active: true,
    page: 1,
    size: 10
  })

  const isLoadingEmployeeList = ref(false)

  const getEmployeeList = async () => {
    isLoadingEmployeeList.value = true

    try {
      const { data } = await getEmployeeListApi({ ...employeeListParams })
      employeeStore.setEmployeeList(data.employees)
      employeeStore.setPaginationEmployeeList(data.pagination)
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingEmployeeList.value = false
    }
  }

  return {
    employeeList: computed(() => employeeStore.employeeList),
    paginationEmployeeList: computed(() => employeeStore.paginationEmployeeList),
    getEmployeeList,
    isLoadingEmployeeList,
    employeeListParams
  }
}
