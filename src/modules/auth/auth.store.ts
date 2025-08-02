import { defineStore } from 'pinia'
import type { AuthState } from '@/modules/auth/auth.types'

export const useAuthStore = defineStore('ola-hr-auth', {
  state: (): AuthState => ({}),
  getters: {},
  actions: {}
})
