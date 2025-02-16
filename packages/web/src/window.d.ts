type OpenFilePickerOptions = {
  id?: string
  types?: Array<{
    description: string
    accept: Record<string, string[]>
  }>
}

type SaveFilePickerOptions = {
  id?: string
  suggestedName?: string
  types?: Array<{
    description: string
    accept: Record<string, string[]>
  }>
}

declare global {
  interface Window {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
     */
    showOpenFilePicker: (options: OpenFilePickerOptions) => Promise<FileSystemFileHandle[]>


    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker
     */
    showSaveFilePicker: (options: SaveFilePickerOptions) => Promise<FileSystemFileHandle>
  }
}

export {}
