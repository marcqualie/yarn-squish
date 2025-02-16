import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ParsedYarnLock, parseYarnLockContent } from '@yarn-squish/core'

export interface YarnLockState {
  source?: string
  sourceParsed?: ParsedYarnLock
  setSource: (source: string | undefined) => void

  openYarnLock: () => Promise<void>
  saveYarnLock: (source: string) => Promise<void>

  queuedVersionsForRemoval?: Record<string, string[]>
  queueVersionForRemoval: (dependency: string, version: string) => void
  unqueueVersionForRemoval: (dependency: string, version: string) => void
  resetQueuedRemovals: () => void
}

export const useYarnLockStore = create<YarnLockState>()(
  persist(
    (set, get) => ({
      setSource: async (source: string | undefined) => {
        set({ source })
        const sourceParsed = source
          ? parseYarnLockContent(source, { optimise: true })
          : undefined
        set({ sourceParsed })
      },

      openYarnLock: async () => {
        const [file] = await window.showOpenFilePicker({
          id: 'yarn-squish',
          types: [
            {
              description: 'Yarn Lock',
              accept: {
                'text/plain': ['.lock'],
              },
            },
          ],
        })
        const content = await file.getFile()
        const source = await content.text()
        get().setSource(source)
      },

      saveYarnLock: async (source) => {
        const file = await window.showSaveFilePicker({
          id: 'yarn-squish',
          suggestedName: 'yarn.lock',
          types: [
            {
              description: 'Yarn Lock',
              accept: {
                'text/plain': ['.lock'],
              },
            },
          ],
        })

        // Create a FileSystemWritableFileStream to write to.
        const writable = await file.createWritable()
        await writable.write(source)
        await writable.close()
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
  ),
)
