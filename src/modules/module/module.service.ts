import http from '@/lib/http/axios'
import type { Module } from '@/modules/module/module.types'

export const getModuleListApi = () => {
  return http.get<Module[]>('/api/modules')
}
