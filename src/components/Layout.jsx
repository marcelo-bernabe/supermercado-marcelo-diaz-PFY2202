import { Outlet } from 'react-router-dom'
import MenuSuperior from './MenuSuperior.jsx'
import MenuInferior from './MenuInferior.jsx'

// Estructura común: menú superior, contenido de la ruta y menú inferior
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MenuSuperior />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <MenuInferior />
    </div>
  )
}
