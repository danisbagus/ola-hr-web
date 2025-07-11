import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import { getEmployeeDetailApi, updateEmployeeApi } from '@/modules/employee/employee.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqUpdateEmployee, ResEmployeeDetail } from '@/modules/employee/employee.types'

export function useEmployee() {
  const employeeStore = useEmployeeStore()
  const { employeeDetail } = storeToRefs(employeeStore)

  // State
  const defaultForm: ReqUpdateEmployee = {
    name: '',
    email: '',
    phone_number: '',
    employment_status: '',
    gender: '',
    division_id: 0,
    role_id: 0,
    hire_date: '',
    birth_date: '',
    address: '',
    is_active: false
  }

  const updateEmployeeForm = reactive<ReqUpdateEmployee>({ ...defaultForm })

  const isLoadingGetEmployeeDetail = ref(false)
  const isGetEmployeeDetailSuccess = ref(false)
  const getEmployeeDetailErrorMessage = ref('')

  const isLoadingUpdateEmployee = ref(false)
  const isUpdateEmployeeSuccess = ref(false)
  const updateEmployeeErrorMessage = ref('')

  // Actions
  const getEmployeeDetail = async (id: number) => {
    isLoadingGetEmployeeDetail.value = true
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''

    employeeStore.setEmployeeDetail(null)

    try {
      const { data } = await getEmployeeDetailApi(id)
      employeeStore.setEmployeeDetail(data)
      setUpdateFormFromDetail(data)
      isGetEmployeeDetailSuccess.value = true
    } catch (error) {
      getEmployeeDetailErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingGetEmployeeDetail.value = false
    }
  }

  const updateEmployee = async (id: number) => {
    isLoadingUpdateEmployee.value = true
    isUpdateEmployeeSuccess.value = false
    updateEmployeeErrorMessage.value = ''

    try {
      await updateEmployeeApi(id, updateEmployeeForm)
      isUpdateEmployeeSuccess.value = true
    } catch (error) {
      updateEmployeeErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingUpdateEmployee.value = false
    }
  }

  const resetEmployeeDetail = () => {
    employeeStore.setEmployeeDetail(null)
    resetUpdateForm()
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''
  }

  // Helpers
  const setUpdateFormFromDetail = (detail: ResEmployeeDetail) => {
    Object.assign(updateEmployeeForm, {
      name: detail.name,
      email: detail.email,
      phone_number: detail.phone_number,
      employment_status: detail.employment_status,
      gender: detail.gender,
      division_id: detail.division_id,
      role_id: detail.role_id,
      hire_date: detail.hire_date,
      birth_date: detail.birth_date,
      address: detail.address,
      is_active: detail.is_active
    })
  }

  const resetUpdateForm = () => {
    Object.assign(updateEmployeeForm, defaultForm)
  }

  // Expose to components
  return {
    // Data
    employeeDetail,
    updateEmployeeForm,

    // Actions
    getEmployeeDetail,
    updateEmployee,
    resetEmployeeDetail,

    // States
    isLoadingGetEmployeeDetail,
    isGetEmployeeDetailSuccess,
    getEmployeeDetailErrorMessage,

    isLoadingUpdateEmployee,
    isUpdateEmployeeSuccess,
    updateEmployeeErrorMessage
  }
}
