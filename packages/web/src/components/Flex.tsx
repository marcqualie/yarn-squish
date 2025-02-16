import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  direction?: 'row' | 'column'
  gap?: 2 | 4 | 6 | 8
  grow?: boolean
  className?: string
  justifyContent?: 'between' | 'center' | 'stretch'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
}

const Flex: React.FC<Props> = (props) => {
  const {
    direction = 'row',
    gap,
    grow,
    children,
    className,
    justifyContent,
    alignItems,
  } = props

  const classNames = ['flex', className].filter(Boolean)

  if (direction === 'row') {
    classNames.push('flex-row')
  }
  if (direction === 'column') {
    classNames.push('flex-col')
  }
  if (gap) {
    classNames.push(`gap-${gap}`)
  }
  if (grow) {
    classNames.push('flex-grow')
  }
  if (justifyContent) {
    classNames.push(`justify-${justifyContent}`)
  }
  if (alignItems) {
    classNames.push(`items-${alignItems}`)
  }

  return <div className={classNames.join(' ')}>{children}</div>
}

Flex.displayName = 'Flex'

export default Flex
