import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { ReqDivision, ResDivisionDetail } from '@/modules/division/division.types'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import { useDivisionStore } from '@/modules/division/division.store'
import {
  getDivisionListApi,
  getDivisionDetailApi,
  createDivisionApi,
  updateDivisionApi,
  deleteDivisionApi,
  deleteBatchDivisionApi
} from '@/modules/division/division.service'
import { useNotify } from '@/shared/hooks/notify.hook'

export function useDivision() {
  const divisionStore = useDivisionStore()
  const { divisionDetail } = storeToRefs(divisionStore)

  const { notifyError, notifySuccess } = useNotify()

  const isLoadingGetDetail = ref(false)
  const isSuccessGetDetail = ref(false)
  const isSuccessCreate = ref(false)
  const isSuccessUpdate = ref(false)
  const isSuccessDelete = ref(false)
  const isSuccessDeleteBatch = ref(false)

  const defaultForm: ReqDivision = {
    name: '',
    is_active: false
  }

  const divisionForm = reactive<ReqDivision>({ ...defaultForm })

  const getDivisionList = async () => {
    try {
      const { data } = await getDivisionListApi({ ...divisionStore.divisionListParams })
      divisionStore.setDivisionList(data.divisions)
      divisionStore.setPaginationDivisionList(data.pagination)
    } catch (error) {
      notifyError('Failed to get divisions', getErrorMessage(error))
    }
  }

  const getDivisionDetail = async (id: number) => {
    isLoadingGetDetail.value = true
    isSuccessGetDetail.value = false
    divisionStore.setDivisionDetail(null)

    try {
      const { data } = await getDivisionDetailApi(id)
      divisionStore.setDivisionDetail(data)
      setFormFromDetail(data)
      isSuccessGetDetail.value = true
    } catch (error) {
      notifyError('Failed to get division detail', getErrorMessage(error))
    } finally {
      isLoadingGetDetail.value = false
    }
  }

  const updateDivision = async (id: number) => {
    isSuccessUpdate.value = false
    try {
      await updateDivisionApi(id, { ...divisionForm })
      isSuccessUpdate.value = true
      notifySuccess('Successfully update division')
    } catch (error) {
      notifyError('Failed to update division', getErrorMessage(error))
    }
  }

  const createDivision = async () => {
    isSuccessCreate.value = false
    try {
      await createDivisionApi({ ...divisionForm })
      isSuccessCreate.value = true
      notifySuccess('Successfully create division')
    } catch (error) {
      notifyError('Failed to create division', getErrorMessage(error))
    }
  }

  const deleteDivision = async (id: number) => {
    isSuccessDelete.value = false
    try {
      await deleteDivisionApi(id)
      isSuccessDelete.value = true
      notifySuccess('Successfully delete division')
    } catch (error) {
      notifyError('Failed to delete division', getErrorMessage(error))
    }
  }

  const deleteBatchDivision = async (ids: number[]) => {
    isSuccessDeleteBatch.value = false
    try {
      await deleteBatchDivisionApi(ids)
      isSuccessDeleteBatch.value = true
      notifySuccess('Successfully delete divisions')
    } catch (error) {
      notifyError('Failed to delete divisions', getErrorMessage(error))
    }
  }

  const resetListParams = () => {
    divisionStore.resetListParams()
    getDivisionList()
  }

  const setPage = (page: number) => {
    divisionStore.setPage(page)
    getDivisionList()
  }

  const setSize = (size: number) => {
    divisionStore.setSize(size)
    getDivisionList()
  }

  const setFormFromDetail = (detail: ResDivisionDetail) => {
    Object.assign(divisionForm, {
      name: detail.name,
      is_active: detail.is_active
    })
  }

  const resetDivisionDetail = () => {
    divisionStore.setDivisionDetail(null)
    resetUpdateForm()
  }

  const resetUpdateForm = () => {
    Object.assign(divisionForm, defaultForm)
  }

  return {
    // actions
    getDivisionList,
    getDivisionDetail,
    createDivision,
    updateDivision,
    deleteDivision,
    deleteBatchDivision,
    resetListParams,
    resetDivisionDetail,
    setPage,
    setSize,

    // states
    divisionList: computed(() => divisionStore.divisionList),
    divisionListParams: computed(() => divisionStore.divisionListParams),
    paginationDivisionList: computed(() => divisionStore.paginationDivisionList),
    divisionDetail,
    divisionForm,
    isLoadingGetDetail,
    isSuccessGetDetail,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessDelete,
    isSuccessDeleteBatch
  }
}
