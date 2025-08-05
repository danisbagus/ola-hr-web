import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useModuleStore } from '@/modules/module/module.store'
import { getModuleListApi } from '@/modules/module/module.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { Module, ModuleTree } from '@/modules/module/module.types'
import { useNotify } from '@/shared/hooks/notify.hook'

export const useModule = () => {
  const moduleStore = useModuleStore()
  const { notifyError } = useNotify()

  const { moduleList } = storeToRefs(moduleStore)

  const getModuleList = async () => {
    try {
      const { data } = await getModuleListApi()
      moduleStore.setModuleList(data)
    } catch (error) {
      notifyError('Failed to get module list', getErrorMessage(error))
    }
  }

  const generateModuleListTree = (data: Module[]): ModuleTree[] => {
    return data.map(item => ({
      id: item.id,
      title: item.name,
      children: item.children ? generateModuleListTree(item.children) : []
    }))
  }

  return {
    // Actions
    getModuleList,

    // State
    moduleList: computed(() => moduleList.value),
    moduleListTree: computed(() => generateModuleListTree(moduleList.value))
  }
}
