import { defineStore } from 'pinia'
import type { AuthState } from '@/stores/interface'
import { getAuthMenuListApi } from '@/api/modules/auth.api'
import { getShowMenuList, getAllBreadcrumbList, getFlatMenuList } from '@/utils'

export const useAuthStore = defineStore('ola-hr-auth', {
  state: (): AuthState => ({
    // button permission list
    authButtonList: {},
    // menu permission list
    authMenuList: [],
    // authMenuList: authMenuList.data,
    // the router name of the current page, used for button permission filtering
    routeName: ''
  }),
  getters: {
    authMenuListGet: state => state.authMenuList,
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // Get AuthMenuList
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi()
      this.authMenuList = data
    },

    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name
    }
  }
})
