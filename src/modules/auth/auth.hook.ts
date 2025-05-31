import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/modules/auth/auth.store'
import { useUserStore } from '@/modules/user/user.store'
import { loginApi, getAuthMenuListApi } from '@/modules/auth/auth.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqLoginParams } from '@/modules/auth/auth.types'

export const useAuth = () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const loginForm = reactive<ReqLoginParams>({
    email: 'danis@live.com',
    password: 'Admin123'
  })

  const isLoadingLogin = ref(false)
  const isLoadingGetMenu = ref(false)

  const login = async () => {
    try {
      isLoadingLogin.value = true

      const { data } = await loginApi({ ...loginForm })

      userStore.setToken(data.token)
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingLogin.value = false
    }
  }

  const getAuthMenuList = async () => {
    isLoadingGetMenu.value = true

    try {
      const { data } = await getAuthMenuListApi()
      console.log('getAuthMenuList', data)
      authStore.setAuthMenuList(data)
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingGetMenu.value = false
    }
  }

  // Mengambil daftar menu yang ditampilkan (filter yang isHide = true), digunakan untuk sidebar kiri
  const getShowMenuList = (menuList: Menu.MenuOptions[]) => {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.filter(item => {
      item.children?.length && (item.children = getShowMenuList(item.children))
      return !item.meta?.isHide
    })
  }

  // Mengambil daftar menu dalam bentuk array satu dimensi, digunakan untuk penambahan route dinamis
  const getFlatMenuList = (menuList: Menu.MenuOptions[]): Menu.MenuOptions[] => {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.flatMap(item => [
      item,
      ...(item.children ? getFlatMenuList(item.children) : [])
    ])
  }

  // Mengambil daftar breadcrumb hasil pemrosesan rekursif dari struktur menu
  const getAllBreadcrumbList = (
    menuList: Menu.MenuOptions[],
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
    authStore.setRouteName(name)
  }

  return {
    authMenuList: computed(() => authStore.authMenuList),
    flatMenuList: computed(() => getFlatMenuList(authStore.authMenuList)),
    breadcrumbList: computed(() => getAllBreadcrumbList(authStore.authMenuList)),
    showMenuList: computed(() => getShowMenuList(authStore.authMenuList)),
    loginForm,
    isLoadingLogin,
    login,
    getAuthMenuList,
    setRouteName
  }
}
