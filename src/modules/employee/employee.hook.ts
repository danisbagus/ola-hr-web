import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import { getEmployeeDetailApi } from '@/modules/employee/employee.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'

export function useEmployee() {
  const employeeStore = useEmployeeStore()

  const { employeeDetail } = storeToRefs(employeeStore)

  const isLoadingGetEmployeeDetail = ref(false)
  const isGetEmployeeDetailSuccess = ref(false)
  const getEmployeeDetailErrorMessage = ref('')

  const getEmployeeDetail = async (id: number) => {
    isLoadingGetEmployeeDetail.value = true
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''

    employeeStore.setEmployeeDetail(null)

    try {
      const { data } = await getEmployeeDetailApi(id)
      employeeStore.setEmployeeDetail(data)
      isGetEmployeeDetailSuccess.value = true
    } catch (error) {
      isGetEmployeeDetailSuccess.value = false
      getEmployeeDetailErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingGetEmployeeDetail.value = false
    }
  }

  const resetEmployeeDetail = () => {
    employeeStore.setEmployeeDetail(null)
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''
  }

  return {
    employeeDetail,
    getEmployeeDetail,
    resetEmployeeDetail,
    isLoadingGetEmployeeDetail,
    isGetEmployeeDetailSuccess,
    getEmployeeDetailErrorMessage
  }
}
