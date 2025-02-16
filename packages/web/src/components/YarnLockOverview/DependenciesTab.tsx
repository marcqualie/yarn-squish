import React, { useState } from 'react'

import { useYarnLockStore } from '../../stores/yarnLock'
import Flex from '../Flex'
import TextInput from '../TextInput'
import { useClassNames } from '../../hooks/useClassNames'

const DependenciesTab: React.FC = () => {
  const parsed = useYarnLockStore((state) => state.parsed)
  const queueVersionForRemoval = useYarnLockStore(
    (state) => state.queueVersionForRemoval,
  )
  const unqueueVersionForRemoval = useYarnLockStore(
    (state) => state.unqueueVersionForRemoval,
  )
  const queuedVersionsForRemoval =
    useYarnLockStore((state) => state.queuedVersionsForRemoval) || {}
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDependency, setSelectedDependency] = useState<string | null>(
    null,
  )
  const classNames = useClassNames()

  const sortedDependencyList = Object.entries(parsed?.dependencies || {})
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(([name, dependency]) => ({
      name,
      dependency,
    }))
    .sort((a, b) => {
      const diff1 =
        Object.keys(a.dependency.versions).length -
        Object.keys(a.dependency.optimisedVersions || {}).length
      const diff2 =
        Object.keys(b.dependency.versions).length -
        Object.keys(b.dependency.optimisedVersions || {}).length
      return diff2 - diff1
    })

  return (
    <Flex direction='column' className='w-full p-4' gap={2}>
      <TextInput value={searchTerm} onChange={setSearchTerm} />

      {sortedDependencyList.map(({ name, dependency }) => {
        const optimisedVersionKeys = Object.keys(
          dependency.optimisedVersions || {},
        )
        const canBeOptimised =
          Object.keys(dependency.versions).join(' ') !==
          optimisedVersionKeys.join(' ')
        return (
          <div
            key={name}
            className={canBeOptimised ? 'opacity-100' : 'opacity-25'}
          >
            <Flex direction='row' justifyContent='between' gap={2}>
              <div
                className='mr-auto cursor-pointer'
                onClick={() =>
                  setSelectedDependency(
                    selectedDependency === name ? null : name,
                  )
                }
              >
                {name}
              </div>
              <Flex direction='row' gap={2} className='w-auto'>
                {Object.keys(dependency.versions).map((version) => {
                  const canBeRemoved = !optimisedVersionKeys.includes(version)
                  const queuedToBeRemoved =
                    !!queuedVersionsForRemoval[name]?.includes(version)

                  return (
                    <span
                      key={version}
                      className={classNames(
                        canBeRemoved
                          ? 'opacity opacity-50 text-orange-700 cursor-pointer'
                          : 'text-green-700',
                        queuedToBeRemoved
                          ? 'line-through text-red-700 text-bold'
                          : '',
                      )}
                      onClick={() => {
                        if (!canBeRemoved) return
                        queuedToBeRemoved
                          ? unqueueVersionForRemoval(name, version)
                          : queueVersionForRemoval(name, version)
                      }}
                    >
                      {version}
                    </span>
                  )
                })}
              </Flex>
            </Flex>
            {[selectedDependency].includes(name) && (
              <div className='p-2 bg-gray-100'>
                <pre>{JSON.stringify(dependency, null, 2)}</pre>
              </div>
            )}
          </div>
        )
      })}
    </Flex>
  )
}

export default DependenciesTab
