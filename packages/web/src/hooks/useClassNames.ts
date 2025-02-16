export const useClassNames = () => {
  return (...classes: string[]) => classes.filter(Boolean).join(' ')
}
