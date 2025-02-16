import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ParsedYarnLock, parseYarnLockContent } from '@yarn-squish/core'

export interface YarnLockState {
  setPath: (path: string | undefined) => Promise<void>
  reloadSource: () => Promise<void>

  path?: string
  source?: string
  setSource: (source: string) => void
  parsed?: ParsedYarnLock

  queuedVersionsForRemoval?: Record<string, string[]>
  queueVersionForRemoval: (dependency: string, version: string) => void
  unqueueVersionForRemoval: (dependency: string, version: string) => void
  resetQueuedRemovals: () => void
}

export const useYarnLockStore = create<YarnLockState>()(
  persist(
    (set, get) => ({
      setSource: async (source: string) => {
        set({ source })
        const parsed = parseYarnLockContent(source, { optimise: true })
        set({ parsed })
      },

      /**
       * Set yarn.lock path and load the source if the file exists.
       */
      setPath: async (path) => {
        set({ path })
      },

      /**
       * Reload the source from the current path.
       */
      reloadSource: async () => {
        const state = get()
        await state.setPath(state.path)
      },

      queueVersionForRemoval: (dependency, version) =>
        set((state) => ({
          queuedVersionsForRemoval: {
            ...state.queuedVersionsForRemoval,
            [dependency]: Array.from(
              new Set([
                ...(state.queuedVersionsForRemoval?.[dependency] || []),
                version,
              ]),
            ),
          },
        })),

      unqueueVersionForRemoval: (dependency, version) =>
        set((state) => {
          const newVersions = (
            state.queuedVersionsForRemoval?.[dependency] || []
          ).filter((v) => v !== version)
          const newQueue = {
            ...state.queuedVersionsForRemoval,
            [dependency]: newVersions,
          }
          if (newVersions.length === 0) {
            delete newQueue[dependency]
          }
          return {
            queuedVersionsForRemoval: newQueue,
          }
        }),

      resetQueuedRemovals: () => set({ queuedVersionsForRemoval: {} }),
    }),
    {
      name: 'yarn-squish',
    },
  )
)
