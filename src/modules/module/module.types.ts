export interface ModuleState {
  moduleList: Module[]
}

export interface Module {
  id: number
  name: string
  children: Module[]
}

export interface ModuleTree {
  id: number
  title: string
  children: ModuleTree[]
}
