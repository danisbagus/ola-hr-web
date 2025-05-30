import type { ReqLoginParams, ResLogin } from '@/modules/auth/auth.types'
import http from '@/lib/http/axios'
import authMenuList from '@/assets/json/authMenuList.json'

export const loginApi = (params: ReqLoginParams) => {
  return http.post<ResLogin>('/api/login', params)
}

export const getAuthMenuListApi = () => {
  return authMenuList
}
