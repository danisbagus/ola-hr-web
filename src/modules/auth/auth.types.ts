export interface AuthState {
  routeName: string
  authMenuList: Menu.MenuOptions[]
  loginParams: ReqLoginParams
}

export interface ReqLoginParams {
  password: string
  email: string
}

export interface ResLogin {
  token: string
}
