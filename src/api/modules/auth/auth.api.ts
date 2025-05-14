import type { Login } from '@/api/interface'
import loginResponse from '@/assets/json/login.json'
import authMenuList from '@/assets/json/authMenuList.json'

export const loginApi = (params: Login.ReqLoginForm) => {
  return loginResponse
}

export const getAuthMenuListApi = () => {
  return authMenuList
}
