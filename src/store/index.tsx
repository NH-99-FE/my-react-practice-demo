import { create } from 'zustand'
import type { IUser } from '../types/api.ts'

interface Store {
  collapsed: boolean
  currentMenu: string
  userInfo: IUser
  updateCollapsed: () => void
  setCurrentMenu: (newMenu: string) => void
  updateUserInfo: (userInfo: IUser) => void
}
const defaultUserInfo = {
  _id: '',
  userName: '',
  userId: 0,
  userEmail: '',
  deptId: '',
  job: '',
  mobile: '',
  role: 0,
  roleList: '',
  state: 0,
  userImg: '',
  sex: 0,
  deptName: '',
  createId: 0,
  createTime: '',
}

const useStore = create<Store>(set => ({
  collapsed: false,
  currentMenu: 'dashboard',
  userInfo: defaultUserInfo,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  setCurrentMenu: (newMenu: string) => set({ currentMenu: newMenu }),
  updateUserInfo: (userInfo: IUser) => set({ userInfo }),
}))

export default useStore
