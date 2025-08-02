import { defineStore } from 'pinia'
import type { MenuState, MenuRouteItem } from '@/modules/menu/menu.types'

export const useMenuStore = defineStore('ola-hr-menu', {
  state: (): MenuState => ({
    routeName: '',
    menuList: []
  }),
  getters: {},
  actions: {
    async setMenuList(data: MenuRouteItem[]) {
      this.menuList = data
    },

    async setRouteName(name: string) {
      this.routeName = name
    }
  }
})
