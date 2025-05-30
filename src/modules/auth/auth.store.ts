import { defineStore } from 'pinia'
import type { AuthState } from '@/modules/auth/auth.types'
import { getAuthMenuListApi } from '@/modules/auth/auth.service'
import { getShowMenuList, getAllBreadcrumbList, getFlatMenuList } from '@/utils'

export const useAuthStore = defineStore('ola-hr-auth', {
  state: (): AuthState => ({
    // Daftar izin tombol (button permissions)
    // authButtonList: {},

    // Nama route saat ini, digunakan untuk menyaring tombol berdasarkan halaman
    routeName: '',

    authMenuList: [],
    loginParams: {
      password: '',
      email: ''
    }
  }),
  getters: {
    // Mengambil daftar izin tombol
    // authButtonListGet: state => state.authButtonList,

    authMenuListGet: state => state.authMenuList,

    // Mengambil daftar menu yang ditampilkan (menyaring yang isHide = true), digunakan untuk sidebar kiri
    showMenuListGet: state => getShowMenuList(state.authMenuList),

    // Mengambil daftar menu dalam bentuk array satu dimensi, digunakan untuk penambahan route dinamis
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),

    // Mengambil daftar breadcrumb hasil pemrosesan rekursif dari struktur menu
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi()
      this.authMenuList = data
    },

    // Menetapkan nama route saat ini
    async setRouteName(name: string) {
      this.routeName = name
    }
  }
})
