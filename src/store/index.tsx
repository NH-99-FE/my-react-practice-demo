import { create } from 'zustand'

interface CollapsedStore {
  collapsed: boolean
  updateCollapsed: () => void
}

const useCollapsedStore = create<CollapsedStore>(set => ({
  collapsed: false,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}))

export default useCollapsedStore
