import { defineStore } from 'pinia'
import type { TabsState, TabsMenuProps } from '@/stores/interface'
import piniaPersistConfig from '@/stores/helper/persist'

export const useTabsStore = defineStore('ola-hr-tabs', {
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  actions: {
    // Set Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList
    }
  },
  persist: piniaPersistConfig('ols-hr-tabs')
})
