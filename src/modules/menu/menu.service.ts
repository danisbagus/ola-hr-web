import http from '@/lib/http/axios'
import type { MenuRouteItem } from './menu.types'

export const getMenuListApi = () => {
  return http.get<MenuRouteItem[]>('/api/menu')
}
