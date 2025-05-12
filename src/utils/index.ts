export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

export const getAllBreadcrumbList = (
  menuList: Menu.MenuOptions[],
  parent = [],
  result: { [key: string]: any } = {}
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}

export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  console.log('menuList', menuList)

  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  console.log('newMenuList', newMenuList)

  return newMenuList.flatMap(item => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}
