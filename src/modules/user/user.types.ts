export interface UserState {
  token: string
  userInfo: ResUserInfo
}

export interface ReqUserInfo {
  name: string
}

export interface ResUserInfo {
  id: number
  name: string
  email: string
  image: string
  role: string
  division: string
}

export interface ReqUpdatePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
