import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { ReqRole, ResRoleDetail } from '@/modules/role/role.types'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import { useRoleStore } from '@/modules/role/role.store'
import {
  getRoleListApi,
  getRoleDetailApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
  deleteBatchRoleApi
} from '@/modules/role/role.service'
import { useNotify } from '@/shared/hooks/notify.hook'

export function useRole() {
  const roleStore = useRoleStore()
  const { roleList, roleDetail, roleListParams, roleListPagination } = storeToRefs(roleStore)
  const { notifyError, notifySuccess } = useNotify()

  const isLoadingGetDetail = ref(false)
  const isSuccessGetDetail = ref(false)
  const isSuccessCreate = ref(false)
  const isSuccessUpdate = ref(false)
  const isSuccessDelete = ref(false)
  const isSuccessDeleteBatch = ref(false)

  const defaultForm: ReqRole = {
    name: '',
    is_active: false,
    module_ids: []
  }

  const roleForm = reactive<ReqRole>({ ...defaultForm })

  const getRoleList = async () => {
    try {
      const { data } = await getRoleListApi({ ...roleStore.roleListParams })
      roleStore.setRoleList(data.roles)
      roleStore.setRolePagination(data.pagination)
    } catch (error) {
      notifyError('Failed to get roles', getErrorMessage(error))
    }
  }

  const getRoleDetail = async (id: number) => {
    isLoadingGetDetail.value = true
    isSuccessGetDetail.value = false
    roleStore.setRoleDetail(null)
    try {
      const { data } = await getRoleDetailApi(id)
      roleStore.setRoleDetail(data)
      setFormFromDetail(data)
      isSuccessGetDetail.value = true
    } catch (error) {
      notifyError('Failed to get role detail', getErrorMessage(error))
    } finally {
      isLoadingGetDetail.value = false
    }
  }
  const updateRole = async (id: number) => {
    isSuccessUpdate.value = false
    try {
      await updateRoleApi(id, { ...roleForm })
      isSuccessUpdate.value = true
      notifySuccess('Successfully update role')
    } catch (error) {
      notifyError('Failed to update role', getErrorMessage(error))
    }
  }

  const createRole = async () => {
    isSuccessCreate.value = false
    try {
      await createRoleApi({ ...roleForm })
      isSuccessCreate.value = true
      notifySuccess('Successfully create role')
    } catch (error) {
      notifyError('Failed to create role', getErrorMessage(error))
    }
  }

  const deleteRole = async (id: number) => {
    isSuccessDelete.value = false
    try {
      await deleteRoleApi(id)
      isSuccessDelete.value = true
      notifySuccess('Successfully delete role')
    } catch (error) {
      notifyError('Failed to delete role', getErrorMessage(error))
    }
  }

  const deleteBatchRole = async (ids: number[]) => {
    isSuccessDeleteBatch.value = false
    try {
      await deleteBatchRoleApi(ids)
      isSuccessDeleteBatch.value = true
      notifySuccess('Successfully delete roles')
    } catch (error) {
      notifyError('Failed to delete roles', getErrorMessage(error))
    }
  }

  const resetListParams = () => {
    roleStore.resetListParams()
    getRoleList()
  }

  const setPage = (page: number) => {
    roleStore.setPage(page)
    getRoleList()
  }

  const setSize = (size: number) => {
    roleStore.setSize(size)
    getRoleList()
  }

  const setFormFromDetail = (detail: ResRoleDetail) => {
    Object.assign(roleForm, {
      name: detail.name,
      is_active: detail.is_active,
      module_ids: detail.module_ids
    })
  }

  const resetRoleDetail = () => {
    roleStore.setRoleDetail(null)
    resetUpdateForm()
  }

  const resetUpdateForm = () => {
    Object.assign(roleForm, defaultForm)
  }

  return {
    // actions
    getRoleList,
    getRoleDetail,
    createRole,
    updateRole,
    deleteRole,
    deleteBatchRole,
    resetListParams,
    resetRoleDetail,
    setPage,
    setSize,

    // states
    roleList,
    roleListParams,
    roleListPagination,
    roleDetail,
    roleForm,
    isLoadingGetDetail,
    isSuccessGetDetail,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessDelete,
    isSuccessDeleteBatch
  }
}
