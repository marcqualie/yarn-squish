interface Props {
  value: string
  readOnly?: boolean
  className?: string
  onChange?: (value: string) => void | Promise<void>
  onClick?: () => void | Promise<void>
}

const TextInput: React.FC<Props> = (props) => {
  const {
    value,
    className,
    onChange = () => undefined,
    onClick = () => undefined,
  } = props

  return (
    <input
      type='text'
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`.trim()}
      value={value}
      autoComplete='off'
      readOnly={props.readOnly}
      onChange={(e) => onChange(e.target.value)}
      onClick={() => onClick()}
    />
  )
}

TextInput.displayName = 'TextInput'

export default TextInput
