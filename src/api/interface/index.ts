export namespace Login {
  export interface ReqLoginForm {
    email: string
    password: string
  }

  export interface ResLogin {
    token: string
  }
}

export namespace User {
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
}
