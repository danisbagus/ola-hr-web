import { defineStore } from 'pinia'
import type { UserState, ReqUserInfo } from '@/modules/user/user.types'
import piniaPersistConfig from '@/stores/helper/persist'

export const useUserStore = defineStore('ola-hr-user', {
  state: (): UserState => ({
    token: '',
    userInfo: {
      id: 0,
      name: '',
      email: '',
      image: '',
      role: '',
      division: ''
    }
  }),

  getters: {},

  actions: {
    setToken(token: string) {
      this.token = token
    },

    setUserInfo(userInfo: ReqUserInfo) {
      this.userInfo = userInfo
    }
  },

  persist: piniaPersistConfig('ola-hr-user')
})
