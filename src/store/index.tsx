import { create } from 'zustand'
import type { IUser } from '../types/api.ts'
import storage from '../utils/storage.ts'

type Theme = 'dark' | 'light'

interface Store {
  collapsed: boolean
  userInfo: IUser
  currentTheme: Theme
  updateCollapsed: () => void
  updateUserInfo: (userInfo: IUser) => void
  setTheme: (theme: Theme) => void
}

const getInitialTheme = (): Theme => {
  // 先从 localStorage 读取，没有就用 'light'
  return (storage.get('theme') as Theme) || 'light'
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
  currentTheme: getInitialTheme(),
  userInfo: defaultUserInfo,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  updateUserInfo: (userInfo: IUser) => set({ userInfo }),
  setTheme: (theme: Theme) => set({ currentTheme: theme }),
}))

export default useStore
