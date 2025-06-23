import { create } from 'zustand'

interface Store {
  collapsed: boolean
  currentMenu: string
  isModalOpen: boolean
  updateCollapsed: () => void
  setCurrentMenu: (newMenu: string) => void
  setIsModalOpen: (isModalOpen: boolean) => void
}

const useStore = create<Store>(set => ({
  collapsed: false,
  currentMenu: 'dashboard',
  isModalOpen: false,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  setCurrentMenu: (newMenu: string) => set({ currentMenu: newMenu }),
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen: isModalOpen }),
}))

export default useStore
