import { defineStore } from 'pinia'
import type { AuthState } from '@/modules/auth/auth.types'

export const useAuthStore = defineStore('ola-hr-auth', {
  state: (): AuthState => ({
    // Nama route saat ini, digunakan untuk menyaring tombol berdasarkan halaman
    routeName: '',
    authMenuList: []
  }),
  getters: {},
  actions: {
    async setAuthMenuList(data: Menu.MenuOptions[]) {
      this.authMenuList = data
    },

    // Menetapkan nama route saat ini
    async setRouteName(name: string) {
      this.routeName = name
    }
  }
})
