import { create } from 'zustand'

interface Store {
  collapsed: boolean
  currentMenu: string
  updateCollapsed: () => void
  setCurrentMenu: (newMenu: string) => void
}

const useStore = create<Store>(set => ({
  collapsed: false,
  currentMenu: 'dashboard',
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  setCurrentMenu: (newMenu: string) => set({ currentMenu: newMenu }),
}))

export default useStore
