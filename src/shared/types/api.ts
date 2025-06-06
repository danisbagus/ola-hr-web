import type { InternalAxiosRequestConfig } from 'axios'

export interface Result {
  code: string
  message: string
  errors: any
  server_time: number
}

export interface ResultData<T = any> extends Result {
  data: T
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}
