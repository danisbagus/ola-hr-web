import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDdlStore } from '@/modules/ddl/ddl.store'
import { getDivisionDdlApi, getRoleDdlApi } from '@/modules/ddl/ddl.service'
import { transformToOptionItem } from '@/modules/ddl/ddl.transformer'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqDdlParams } from '@/modules/ddl/ddl.types'

export function useDdl() {
  const ddlStore = useDdlStore()

  const { divisionDdl, roleDdl, genders, generalStatus, employmentStatus } = storeToRefs(ddlStore)

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
    getDivisionDdl,
    getRoleDdl,
    divisionDdl,
    roleDdl,
    genders,
    generalStatus,
    employmentStatus,
    isLoadingDivision,
    isLoadingRole
  }
}
