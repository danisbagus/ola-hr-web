import type { InternalAxiosRequestConfig } from 'axios'

// 请求响应参数（不包含data）
export interface Result {
  code: string
  message: string
  errors: any
  server_time: number
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}
