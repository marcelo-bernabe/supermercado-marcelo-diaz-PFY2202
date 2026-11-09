import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventarioProvider } from './context/InventarioContext.jsx'
import './index.css'

// HashRouter evita errores 404 al recargar páginas internas en GitHub Pages
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </StrictMode>,
)
