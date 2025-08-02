import type { ReqLoginParams, ResLogin } from '@/modules/auth/auth.types'
import http from '@/lib/http/axios'

export const loginApi = (params: ReqLoginParams) => {
  return http.post<ResLogin>('/api/login', params)
}
