type Props = {
  contents: string
}

export const useWriteTextFile = () => {
  const writeTextFile = async ({ contents }: Props) => {
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
      ]
    })

    // Create a FileSystemWritableFileStream to write to.
    const writable = await file.createWritable()
    await writable.write(contents)
    await writable.close()
  }

  return {
    writeTextFile,
  }
}
