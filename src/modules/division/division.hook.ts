import { ref, reactive, computed } from 'vue'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import { useDivisionStore } from '@/modules/division/division.store'
import { getDivisionListApi } from '@/modules/division/division.service'
import { useNotify } from '@/shared/hooks/notify.hook'

export function useDivision() {
  const divisionStore = useDivisionStore()

  const { notifyError } = useNotify()

  const getDivisionList = async () => {
    try {
      const { data } = await getDivisionListApi({ ...divisionStore.divisionListParams })
      divisionStore.setDivisionList(data.divisions)
      divisionStore.setPaginationDivisionList(data.pagination)
    } catch (error) {
      notifyError(getErrorMessage(error), 'Failed to fetch divisions')
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

  return {
    // actions
    getDivisionList,
    resetListParams,
    setPage,
    setSize,

    // states
    divisionList: computed(() => divisionStore.divisionList),
    divisionListParams: computed(() => divisionStore.divisionListParams),
    paginationDivisionList: computed(() => divisionStore.paginationDivisionList)
  }
}
