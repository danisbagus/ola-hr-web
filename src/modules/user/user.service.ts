import type { ReqUserInfo, ReqUpdatePassword } from '@/modules/user/user.types'
import userInfo from '@/assets/json/userInfo.json'

export const getUserInfoApi = () => {
  return userInfo
}

export const updateUserInfoApi = (params: ReqUserInfo) => {}

export const updatePasswordApi = (params: ReqUpdatePassword) => {}
