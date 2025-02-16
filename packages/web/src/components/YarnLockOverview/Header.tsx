import React from 'react'
import { Application, CloseOutline, Flash, Renew } from '@carbon/icons-react'

import Flex from '../Flex'
import { useYarnLockStore } from '../../stores/yarnLock'
import { useNumberFormat } from '../../hooks/useNumberFormat'
import Badge from '../Badage'
import { useTabsStore } from '../../stores/selectedTab'
import Button from '../Button'
import { useApplyQueuedChanges } from '../../hooks/useApplyQueuedChanges'
import FullAppSpinner from '../FullAppSpinner'

const Header: React.FC = () => {
  const path = useYarnLockStore((state) => state.path || '')
  const setPath = useYarnLockStore((state) => state.setPath)
  const source = useYarnLockStore((state) => state.source)
  const parsed = useYarnLockStore((state) => state.parsed)
  const reloadSource = useYarnLockStore((state) => state.reloadSource)
  const numberFormat = useNumberFormat()
  const fileSize = Math.ceil((source?.length || 0) / 1000)
  const totalResolvedVersions = Object.values(
    parsed?.dependencies || {},
  ).reduce((acc, { versions }) => acc + Object.keys(versions).length, 0)
  const { selectedTab, setSelectedTab } = useTabsStore()
  const queuedVersionsForRemoval = useYarnLockStore(
    (state) => state.queuedVersionsForRemoval,
  )
  const { applyQueuedChanges, loading } = useApplyQueuedChanges()

  const totalQueuedRemovals = Object.values(
    queuedVersionsForRemoval || {},
  ).reduce((acc, versions) => acc + versions.length, 0)

  return (
    <>
      <Flex
        direction='row'
        justifyContent='between'
        alignItems='center'
        className='border-b-2 border-gray-200 p-2 bg-white z-30 shadow min-h-14'
        gap={4}
      >
        <Flex className='mr-5' gap={2}>
          <Badge
            active={selectedTab === 'dependencies'}
            onClick={() => setSelectedTab('dependencies')}
          >
            <Application />
            <span className='ml-1'>
              {numberFormat.format(totalResolvedVersions)}
            </span>
          </Badge>
          <Badge
            active={selectedTab === 'source'}
            onClick={() => setSelectedTab('source')}
          >
            {numberFormat.format(fileSize)} kb
          </Badge>
        </Flex>

        <Flex alignItems='center' gap={2}>
          {totalQueuedRemovals > 0 && (
            <Button
              onPress={() => applyQueuedChanges()}
              className='text-xs'
              variant='primary'
            >
              <Flash />
              <span className='ml-1'>
                Optimize <sup>({totalQueuedRemovals})</sup>
              </span>
            </Button>
          )}
          <Renew
            size={20}
            onClick={() => reloadSource()}
            className='cursor-pointer'
          />
          <CloseOutline
            size={20}
            onClick={() => setPath(undefined)}
            className='cursor-pointer'
          />
        </Flex>
      </Flex>
      {loading && <FullAppSpinner />}
    </>
  )
}

export default Header
