import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './utils/tailwind'
import { App } from './App'

import './index.css'

const example = `
"react@^18.2.1":
  version "18.2.1"
  resolved "https://registry.yarnpkg.com/react/-/react-18.2.1.tgz#b1e1d4e7a7b0a7b6f5b1d2b2e
  integrity sha512-1c3
  dependencies:
    "react-dom@^18.2.1" "18.2.1"
`

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.body).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
