import { ReactElement } from 'react'
import { TabItem, TabsContext } from './context'
import { TabPanelProps } from './TabPanel'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  tabs: TabItem[]
  selectedTab: string
  onChange?: (key: string) => void
  children: ReactElement<TabPanelProps>[]
}

const Tabs: React.FC<Props> = (props) => {
  const { tabs, selectedTab, children, onChange = () => undefined } = props

  return (
    <TabsContext.Provider value={{ selectedTab, tabs }}>
      {/** Small Screen: Dropdown */}
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          defaultValue={tabs.find((tab) => tab.id)?.label}
          onChange={(e) => onChange(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/** Large Screen: Tabs */}
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => (
              <a
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={classNames(
                  tab.id === selectedTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium transition-all cursor-pointer',
                )}
                aria-current={tab.id ? 'page' : undefined}
              >
                {tab.label}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.id === selectedTab
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
                {tab.badge && (
                  <span
                    className={classNames(
                      tab.id === selectedTab
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {children}
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'

export default Tabs
