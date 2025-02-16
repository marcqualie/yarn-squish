import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TabsStoreState {
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

export const useTabsStore = create<TabsStoreState>()(
  devtools(
    persist(
      (set) => ({
        selectedTab: 'dependencies',
        setSelectedTab: (tab: string) => set({ selectedTab: tab }),
      }),
      {
        name: 'tabs-store',
      },
    ),
  ),
)
