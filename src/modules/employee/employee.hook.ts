import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import {
  getEmployeeDetailApi,
  updateEmployeeApi,
  createEmployeeApi,
  deleteEmployeeApi,
  deleteBatchEmployeeApi
} from '@/modules/employee/employee.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqEmployee, ResEmployeeDetail } from '@/modules/employee/employee.types'

export function useEmployee() {
  const employeeStore = useEmployeeStore()
  const { employeeDetail } = storeToRefs(employeeStore)

  // State
  const defaultForm: ReqEmployee = {
    name: '',
    email: '',
    phone_number: '',
    employment_status: '',
    gender: '',
    division_id: null,
    role_id: null,
    hire_date: '',
    birth_date: '',
    address: '',
    is_active: false
  }

  const employeeForm = reactive<ReqEmployee>({ ...defaultForm })

  const isLoadingGetEmployeeDetail = ref(false)
  const isGetEmployeeDetailSuccess = ref(false)
  const getEmployeeDetailErrorMessage = ref('')

  const isLoadingUpdateEmployee = ref(false)
  const isUpdateEmployeeSuccess = ref(false)
  const updateEmployeeErrorMessage = ref('')

  const isLoadingCreateEmployee = ref(false)
  const isCreateEmployeeSuccess = ref(false)
  const createEmployeeErrorMessage = ref('')

  const isLoadingDeleteEmployee = ref(false)
  const isDeleteEmployeeSuccess = ref(false)
  const deleteEmployeeErrorMessage = ref('')

  const isLoadingDeleteBatchEmployee = ref(false)
  const isDeleteBatchEmployeeSuccess = ref(false)
  const deleteBatchEmployeeErrorMessage = ref('')

  // Actions
  const getEmployeeDetail = async (id: number) => {
    isLoadingGetEmployeeDetail.value = true
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''

    employeeStore.setEmployeeDetail(null)

    try {
      const { data } = await getEmployeeDetailApi(id)
      employeeStore.setEmployeeDetail(data)
      setFormFromDetail(data)
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
      await updateEmployeeApi(id, { ...employeeForm })
      isUpdateEmployeeSuccess.value = true
    } catch (error) {
      updateEmployeeErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingUpdateEmployee.value = false
    }
  }

  const createEmployee = async () => {
    isLoadingCreateEmployee.value = true
    isCreateEmployeeSuccess.value = false
    createEmployeeErrorMessage.value = ''
    try {
      const { data } = await createEmployeeApi({ ...employeeForm })
      isCreateEmployeeSuccess.value = true
      return data
    } catch (error) {
      createEmployeeErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingCreateEmployee.value = false
    }
  }

  const deleteEmployee = async (id: number) => {
    isLoadingDeleteEmployee.value = true
    isDeleteEmployeeSuccess.value = false
    deleteEmployeeErrorMessage.value = ''

    try {
      await deleteEmployeeApi(id)
      isDeleteEmployeeSuccess.value = true
    } catch (error) {
      deleteEmployeeErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingDeleteEmployee.value = false
    }
  }

  const deleteBatchEmployee = async (ids: number[]) => {
    isLoadingDeleteBatchEmployee.value = true
    isDeleteBatchEmployeeSuccess.value = false
    deleteBatchEmployeeErrorMessage.value = ''

    try {
      await deleteBatchEmployeeApi(ids)
      isDeleteBatchEmployeeSuccess.value = true
    } catch (error) {
      deleteBatchEmployeeErrorMessage.value = getErrorMessage(error)
    } finally {
      isLoadingDeleteBatchEmployee.value = false
    }
  }

  const resetEmployeeDetail = () => {
    employeeStore.setEmployeeDetail(null)
    resetUpdateForm()
    isGetEmployeeDetailSuccess.value = false
    getEmployeeDetailErrorMessage.value = ''
  }

  // Helpers
  const setFormFromDetail = (detail: ResEmployeeDetail) => {
    Object.assign(employeeForm, {
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
    Object.assign(employeeForm, defaultForm)
  }

  // Expose to components
  return {
    // Data
    employeeDetail,
    employeeForm,

    // Actions
    getEmployeeDetail,
    updateEmployee,
    createEmployee,
    deleteEmployee,
    deleteBatchEmployee,
    resetEmployeeDetail,

    // States
    isLoadingGetEmployeeDetail,
    isGetEmployeeDetailSuccess,
    getEmployeeDetailErrorMessage,

    isLoadingUpdateEmployee,
    isUpdateEmployeeSuccess,
    updateEmployeeErrorMessage,

    isLoadingCreateEmployee,
    isCreateEmployeeSuccess,
    createEmployeeErrorMessage,

    isLoadingDeleteEmployee,
    isDeleteEmployeeSuccess,
    deleteEmployeeErrorMessage,

    isLoadingDeleteBatchEmployee,
    isDeleteBatchEmployeeSuccess,
    deleteBatchEmployeeErrorMessage
  }
}
