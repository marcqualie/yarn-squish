import { createContext, useContext } from 'react'

export interface TabItem {
  id: string
  label: string
  count?: number
  badge?: string
}

interface TabContext {
  selectedTab: string
  tabs: TabItem[]
}

export const TabsContext = createContext<TabContext>({
  selectedTab: '',
  tabs: [],
})

export const useTabsContext = () => useContext(TabsContext)
