import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  onPress: () => void
  className?: string
  isDisabled?: boolean
  variant?: 'primary' | 'default'
}

const Button: React.FC<Props> = (props) => {
  const { className, onPress, variant = 'default', isDisabled = false } = props

  const classNames = [
    'flex items-center px-2 py-1 font-semibold',
    'text-sm',
    variant === 'default'
      ? 'text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
      : '',
    variant === 'primary' ? 'bg-green-600 text-white' : '',
    'rounded shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].filter(Boolean)

  return (
    <button
      onClick={() => onPress()}
      disabled={isDisabled}
      className={classNames.join(' ')}
    >
      {props.children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
