export interface GlobalState {
  // maximize: boolean
  // primary: string
  // isDark: boolean
  // isGrey: boolean
  // isWeak: boolean
  // asideInverted: boolean
  // headerInverted: boolean
  isCollapse: boolean
  accordion: boolean
  // watermark: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  // tabs: boolean
  // tabsIcon: boolean
  footer: boolean
}

export interface UserState {
  token: string
  userInfo: { name: string }
}

export interface AuthState {
  routeName: string
  authButtonList: {
    [key: string]: string[]
  }
  authMenuList: Menu.MenuOptions[]
}

export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
  isKeepAlive: boolean
}

export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

export interface KeepAliveState {
  keepAliveName: string[]
}
