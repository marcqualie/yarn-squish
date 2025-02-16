import { useState } from 'react'
import { prepareRemovals } from '@yarn-squish/core'

import { useYarnLockStore } from '../stores/yarnLock'
import { useWriteTextFile } from './useWriteTextFile'

export const useApplyQueuedChanges = () => {
  const [loading, setLoading] = useState(false)
  const { writeTextFile } = useWriteTextFile()
  const source = useYarnLockStore((state) => state.source)
  const setSource = useYarnLockStore((state) => state.setSource)
  const reloadSource = useYarnLockStore((state) => state.reloadSource)
  const queuedVersionsForRemoval = useYarnLockStore(
    (state) => state.queuedVersionsForRemoval,
  )
  const resetQueuedRemovals = useYarnLockStore(
    (state) => state.resetQueuedRemovals,
  )

  const applyQueuedChanges = async () => {
    setLoading(true)
    if (!source) {
      setLoading(false)
      return
    }
    const newSource = prepareRemovals(source, queuedVersionsForRemoval || {})
    await writeTextFile({ contents: newSource })
      .then(async () => {
        resetQueuedRemovals()
        setSource(newSource)
      })
      .catch((e) => {
        console.error(e)
      })
    setLoading(false)
  }

  return {
    applyQueuedChanges,
    loading,
  }
}
