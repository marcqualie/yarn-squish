import type { FC } from 'react'

import { useYarnLockStore } from './stores/yarnLock'
import YarnLockOverview from './components/YarnLockOverview'
import { YarnLockSelector } from './components/YarnLockSelector'

export const App: FC = () => {
  const source = useYarnLockStore((state) => state.source)

  if (source) {
    return <YarnLockOverview />
  } else {
    return <YarnLockSelector />
  }
}
