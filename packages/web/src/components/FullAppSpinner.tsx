import React from 'react'
import Flex from './Flex'
import { Renew } from '@carbon/icons-react'

const FullAppSpinner: React.FC = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      className='w-full h-full fixed top-0 left-0 backdrop-blur-sm z-50'
    >
      <Renew className='animate-spin' size={50} />
    </Flex>
  )
}

export default FullAppSpinner
