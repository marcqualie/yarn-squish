import React from 'react'

import TextArea from '../TextArea'
import { useYarnLockStore } from '../../stores/yarnLock'
import Flex from '../Flex'

const SourceTab: React.FC = () => {
  const source = useYarnLockStore((state) => state.source)

  return (
    <Flex className='p-2 w-full'>
      <TextArea value={source || ''} className='flex-grow' />
    </Flex>
  )
}

export default SourceTab
