import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const hidePageLoader = () => {
  const loader = document.getElementById('page-loader')
  if (!loader) return
  loader.classList.add('is-hidden')
  window.setTimeout(() => loader.remove(), 600)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

hidePageLoader()
