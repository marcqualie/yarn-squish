import React, { PropsWithChildren } from 'react'
import Flex from '../Flex'
import { useTabsContext } from './context'

interface Props extends PropsWithChildren {
  id: string
}

export type TabPanelProps = Props

const TabPanel: React.FC<Props> = ({ id, children }) => {
  const tabsContext = useTabsContext()

  if (tabsContext.selectedTab !== id) {
    return null
  }

  return (
    <Flex grow={true} className='overflow-auto'>
      {children}
    </Flex>
  )
}

TabPanel.displayName = 'TabPanel'

export default TabPanel
