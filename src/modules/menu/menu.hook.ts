import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/modules/menu/menu.store'
import { getMenuListApi } from '@/modules/menu/menu.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { MenuRouteItem } from '@/modules/menu/menu.types'
import { useNotify } from '@/shared/hooks/notify.hook'

export const useMenu = () => {
  const menuStore = useMenuStore()
  const { notifyError } = useNotify()

  const { menuList } = storeToRefs(menuStore)

  const getMenuList = async () => {
    try {
      const { data } = await getMenuListApi()
      menuStore.setMenuList(data)
    } catch (error) {
      notifyError('Failed to get menu list', getErrorMessage(error))
    }
  }

  // Mengambil daftar menu dalam bentuk array satu dimensi, digunakan untuk penambahan route dinamis
  const getFlatMenuList = (menuList: MenuRouteItem[]): MenuRouteItem[] => {
    let newMenuList: MenuRouteItem[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.flatMap(item => [
      item,
      ...(item.children ? getFlatMenuList(item.children) : [])
    ])
  }

  // Mengambil daftar menu yang ditampilkan (filter yang isHide = true), digunakan untuk sidebar kiri
  const getShowMenuList = (menuList: MenuRouteItem[]) => {
    let newMenuList: MenuRouteItem[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.filter(item => {
      item.children?.length && (item.children = getShowMenuList(item.children))
      return !item.meta?.is_hide
    })
  }

  // Mengambil daftar breadcrumb hasil pemrosesan rekursif dari struktur menu
  const getAllBreadcrumbList = (
    menuList: MenuRouteItem[],
    parent = [],
    result: { [key: string]: any } = {}
  ) => {
    for (const item of menuList) {
      result[item.path] = [...parent, item]
      if (item.children) {
        getAllBreadcrumbList(item.children, result[item.path], result)
      }
    }
    return result
  }

  const setRouteName = (name: string) => {
    menuStore.setRouteName(name)
  }

  return {
    // Actions
    getMenuList,
    setRouteName,

    // State
    menuList: computed(() => menuList.value),
    flatMenuList: computed(() => getFlatMenuList(menuList.value)), // untuk dynamic router
    showMenuList: computed(() => getShowMenuList(menuList.value)), // untuk sidebar
    breadcrumbList: computed(() => getAllBreadcrumbList(menuList.value))
  }
}
