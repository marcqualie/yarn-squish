import { DocumentView } from '@carbon/icons-react'

import Button from '../Button'
import Flex from '../Flex'
import { useYarnLockStore } from '../../stores/yarnLock'

import type { FC } from 'react'

export const YarnLockSelector: FC = () => {
  const { setSource } = useYarnLockStore()

  const openYarnLock = async () => {
    const [file] = await window.showOpenFilePicker({
      id: 'yarn-squish',
      types: [
        {
          description: 'Yarn Lock',
          accept: {
            'text/plain': ['.lock'],
          }
        }
      ]
    })
    const content = await file.getFile()
    setSource(await content.text())
  }

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      className='w-full h-dvh'
    >
      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        className='w-full h-full'
      >
        <Button onPress={() => openYarnLock()} className='mx-auto'>
          <DocumentView />
          <span className='ml-1'>
            Open <strong>yarn.lock</strong> from disk
          </span>
        </Button>

        <br />

        <span className='text-gray-400 text-xs'>
          v0.1.0 by Marc Qualie
        </span>
      </Flex>
    </Flex>
  )
}
