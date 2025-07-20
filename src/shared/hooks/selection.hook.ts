import { ref, computed } from 'vue'

export const useSelection = (rowKey: string = 'id') => {
  const isSelected = ref<boolean>(false)
  const selectedList = ref<{ [key: string]: any }[]>([])

  const selectedListIds = computed((): number[] => {
    let ids: number[] = []
    selectedList.value.forEach(item => ids.push(item[rowKey]))
    return ids
  })

  const selectionChange = (rowArr: { [key: string]: any }[]) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange
  }
}
