import api from '../api'
import { getMenuPath } from '../utils'

export default async function AuthLoader() {
  const data = await api.getPermissionList()
  const { menuList, buttonList } = data
  const menuPathList = getMenuPath(menuList)
  return {
    menuList,
    menuPathList,
    buttonList,
  }
}
