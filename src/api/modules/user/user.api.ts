import type { User } from '@/api/interface'
import userInfo from '@/assets/json/userInfo.json'

export const getUserInfoApi = () => {
  return userInfo
}

export const updateUserInfoApi = (params: User.ReqUserInfo) => {}
