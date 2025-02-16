import React, { PropsWithChildren } from 'react'

interface Props {
  active?: boolean
  onClick?: () => void
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

const Badge: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  active = false,
}) => {
  return (
    <span
      className={classNames(
        'flex items-center',
        'rounded-full py-1 px-4 text-sm font-medium transition-all',
        active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
        onClick ? 'cursor-pointer' : '',
      )}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Badge
