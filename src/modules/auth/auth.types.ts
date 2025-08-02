export interface AuthState {}

export interface ReqLoginParams {
  password: string
  email: string
}

export interface ResLogin {
  token: string
}
