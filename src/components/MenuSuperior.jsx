import { Link } from 'react-router-dom'
import EnlaceMenu from './EnlaceMenu.jsx'
import { useInventario } from '../context/InventarioContext.jsx'

// Menú de gestión de inventario (semana 2) + acceso al carrito (semana 3)
export default function MenuSuperior() {
  const { totalUnidades } = useInventario()

  return (
    <header className="bg-emerald-700 shadow">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-white">
          🛒 FrescoMarket
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          <EnlaceMenu to="/agregar">Agregar artículo</EnlaceMenu>
          <EnlaceMenu to="/articulos">Inventario</EnlaceMenu>
          <EnlaceMenu to="/carrito">
            Carrito
            <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
              {totalUnidades}
            </span>
          </EnlaceMenu>
        </div>
      </nav>
    </header>
  )
}
