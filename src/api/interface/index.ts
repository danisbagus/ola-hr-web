export namespace Login {
  export interface ReqLoginForm {
    email: string
    password: string
  }

  export interface ResLogin {
    token: string
  }
}
