declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<unknown>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }
}

declare interface ViteEnv {
  VITE_GLOB_APP_TITLE: string
  VITE_API_URL: string
  VITE_PORT: number
  VITE_PROXY: string
}
