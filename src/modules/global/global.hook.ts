import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/modules/global/global.store'

export function useGlobal() {
  const globalStore = useGlobalStore()
  const { isCollapse } = storeToRefs(globalStore)

  const toggleCollapse = () => {
    globalStore.setGlobalState('isCollapse', !isCollapse.value)
  }

  const toggleCollapseWithParam = (value: boolean) => {
    globalStore.setGlobalState('isCollapse', value)
  }

  return {
    isCollapse,
    toggleCollapse,
    toggleCollapseWithParam
  }
}
