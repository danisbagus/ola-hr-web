import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/modules/employee/employee.store'
import {
  getEmployeeListApi,
  getEmployeeDetailApi,
  updateEmployeeApi,
  createEmployeeApi,
  deleteEmployeeApi,
  deleteBatchEmployeeApi
} from '@/modules/employee/employee.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqEmployee, ResEmployeeDetail } from '@/modules/employee/employee.types'
import { useNotify } from '@/shared/hooks/notify.hook'

export function useEmployee() {
  const employeeStore = useEmployeeStore()
  const { employeeList, employeeDetail, employeeListParams, employeeListPagination } =
    storeToRefs(employeeStore)

  const { notifyError, notifySuccess } = useNotify()

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

  const isLoadingGetDetail = ref(false)
  const isSuccessGetDetail = ref(false)
  const isSuccessCreate = ref(false)
  const isSuccessUpdate = ref(false)
  const isSuccessDelete = ref(false)
  const isSuccessDeleteBatch = ref(false)

  // Actions
  const getEmployeeList = async () => {
    try {
      const { data } = await getEmployeeListApi({ ...employeeStore.employeeListParams })
      employeeStore.setEmployeeList(data.employees)
      employeeStore.setemployeeListPagination(data.pagination)
    } catch (error) {
      notifyError('Failed to get divisions', getErrorMessage(error))
    }
  }
  const getEmployeeDetail = async (id: number) => {
    isLoadingGetDetail.value = true
    isSuccessGetDetail.value = false
    employeeStore.setEmployeeDetail(null)

    try {
      const { data } = await getEmployeeDetailApi(id)
      employeeStore.setEmployeeDetail(data)
      setFormFromDetail(data)
      isSuccessGetDetail.value = true
    } catch (error) {
      notifyError('Failed to get employee detail', getErrorMessage(error))
    } finally {
      isLoadingGetDetail.value = false
    }
  }

  const updateEmployee = async (id: number) => {
    isSuccessUpdate.value = false
    try {
      await updateEmployeeApi(id, { ...employeeForm })
      isSuccessUpdate.value = true
      notifySuccess('Successfully update employee')
    } catch (error) {
      notifyError('Failed to update employee', getErrorMessage(error))
    }
  }

  const createEmployee = async () => {
    isSuccessCreate.value = false
    try {
      await createEmployeeApi({ ...employeeForm })
      isSuccessCreate.value = true
      notifySuccess('Successfully create employee')
    } catch (error) {
      notifyError('Failed to create employee', getErrorMessage(error))
    }
  }

  const deleteEmployee = async (id: number) => {
    isSuccessDelete.value = false
    try {
      await deleteEmployeeApi(id)
      isSuccessDelete.value = true
      notifySuccess('Successfully delete employee')
    } catch (error) {
      notifyError('Failed to delete employee', getErrorMessage(error))
    }
  }

  const deleteBatchEmployee = async (ids: number[]) => {
    isSuccessDeleteBatch.value = false
    try {
      await deleteBatchEmployeeApi(ids)
      isSuccessDeleteBatch.value = true
      notifySuccess('Successfully delete employees')
    } catch (error) {
      notifyError('Failed to delete employees', getErrorMessage(error))
    }
  }

  const resetListParams = () => {
    employeeStore.resetListParams()
    getEmployeeList()
  }

  const resetEmployeeDetail = () => {
    employeeStore.setEmployeeDetail(null)
    resetUpdateForm()
  }

  const setPage = (page: number) => {
    employeeStore.setPage(page)
    getEmployeeList()
  }

  const setSize = (size: number) => {
    employeeStore.setSize(size)
    getEmployeeList()
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
    // Actions
    getEmployeeList,
    getEmployeeDetail,
    updateEmployee,
    createEmployee,
    deleteEmployee,
    deleteBatchEmployee,
    resetListParams,
    resetEmployeeDetail,
    setPage,
    setSize,

    // States
    employeeList,
    employeeListParams,
    employeeListPagination,
    employeeDetail,
    employeeForm,
    isLoadingGetDetail,
    isSuccessGetDetail,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessDelete,
    isSuccessDeleteBatch
  }
}
