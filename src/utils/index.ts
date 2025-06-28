// 日期格式化
import type { IMenu } from '../types/api.ts'

export function formatDate(isoString: string): string {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function formatState(state: number) {
  if (state === 1) {
    return '在职'
  } else if (state === 2) {
    return '试用期'
  } else {
    return '离职'
  }
}

// 获取菜单的path
export function getMenuPath(menuList: IMenu[]): string[] {
  return menuList.reduce((res: string[], item: IMenu) => {
    return res.concat(
      Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + ''
    )
  }, [])
}

// 获取面包屑items
export function getBreadItems(menuList: IMenu[], pathname: string, path: string[]): string[] {
  if (!menuList) return []
  for (const menu of menuList) {
    path.push(menu.menuName)
    if (menu.path === pathname) {
      return [...path]
    }
    if (menu.children?.length) {
      const list = getBreadItems(menu.children, pathname, path)
      if (list.length) return list
    }
    path.pop()
  }
  return []
}
