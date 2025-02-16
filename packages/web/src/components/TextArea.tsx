interface Props {
  value: string
  className?: string
  onChange?: (value: string) => void
  rows?: number
}

const TextArea: React.FC<Props> = (props) => {
  const { value, className, rows = 5, onChange = () => undefined } = props

  return (
    <textarea
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
    />
  )
}

TextArea.displayName = 'TextArea'

export default TextArea
