import { computed, reactive, ref } from 'vue'
import { useDdlStore } from '@/modules/ddl/ddl.store'
import { getDivisionDdlApi, getRoleDdlApi } from '@/modules/ddl/ddl.service'
import { transformToOptionItem } from '@/modules/ddl/ddl.transformer'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqDdlParams } from '@/modules/ddl/ddl.types'

export function useDdl() {
  const ddlStore = useDdlStore()

  const ddlDivisonParams = reactive<ReqDdlParams>({
    page: 1,
    size: 100
  })

  const ddlRoleParams = reactive<ReqDdlParams>({
    page: 1,
    size: 100
  })

  const isLoadingDivision = ref(false)
  const isLoadingRole = ref(false)

  const getDivisionDdl = async () => {
    isLoadingDivision.value = true

    try {
      const { data } = await getDivisionDdlApi({ ...ddlDivisonParams })
      ddlStore.setDdlDivision(data.ddl.map(transformToOptionItem))
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingDivision.value = false
    }
  }

  const getRoleDdl = async () => {
    isLoadingRole.value = true

    try {
      const { data } = await getRoleDdlApi({ ...ddlRoleParams })
      ddlStore.setDdlRole(data.ddl.map(transformToOptionItem))
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingRole.value = false
    }
  }

  return {
    divisionDdl: computed(() => ddlStore.divisionDdl),
    roleDdl: computed(() => ddlStore.roleDdl),
    generalStatus: computed(() => ddlStore.generalStatus),
    getDivisionDdl,
    getRoleDdl,
    isLoadingDivision,
    isLoadingRole
  }
}
