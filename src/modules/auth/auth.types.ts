export interface AuthState {
  routeName: string
  authMenuList: Menu.MenuOptions[]
}

export interface ReqLoginParams {
  password: string
  email: string
}

export interface ResLogin {
  token: string
}
