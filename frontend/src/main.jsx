import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="bg-gray-green h-full md:h-screen select-none">
      <App />
    </main>
  </StrictMode>,
)
