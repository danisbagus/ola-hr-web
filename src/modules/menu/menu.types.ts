export interface MenuState {
  routeName: string
  menuList: MenuRouteItem[]
}

export interface MenuRouteItem {
  path: string
  name: string
  component?: string | (() => Promise<unknown>)
  redirect?: string
  meta?: {
    title: string
    icon?: string
    is_link?: boolean
    is_hide?: boolean
    is_full?: boolean
  }
  children?: MenuRouteItem[]
}
