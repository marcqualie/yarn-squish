import React from 'react'

import Flex from '../Flex'
import Tabs from '../Tabs/Tabs'
import TabPanel from '../Tabs/TabPanel'
import Header from './Header'
import DependenciesTab from './DependenciesTab'
import SourceTab from './SourceTab'
import { useTabsStore } from '../../stores/selectedTab'

const YarnLockOverview: React.FC = () => {
  const { selectedTab, setSelectedTab } = useTabsStore()

  return (
    <Flex direction='column' className='w-full h-dvh'>
      <Header />

      <Flex direction='column' grow={true} className='overflow-hidden'>
        <Tabs
          tabs={[]}
          selectedTab={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <TabPanel id='source'>
            <SourceTab />
          </TabPanel>
          <TabPanel id='dependencies'>
            <DependenciesTab />
          </TabPanel>
        </Tabs>
      </Flex>
    </Flex>
  )
}

export default YarnLockOverview
