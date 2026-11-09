import { NavLink } from 'react-router-dom'

// Enlace reutilizable que se resalta cuando su ruta está activa
export default function EnlaceMenu({ to, children, end = false, variante = 'claro' }) {
  const base = 'rounded-lg px-3 py-2 text-sm font-medium transition-colors'
  const estilos = {
    claro: (activo) => (activo ? 'bg-white text-emerald-700' : 'text-emerald-50 hover:bg-emerald-600'),
    oscuro: (activo) => (activo ? 'text-white underline underline-offset-4' : 'text-slate-300 hover:text-white'),
  }
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `${base} ${estilos[variante](isActive)}`}>
      {children}
    </NavLink>
  )
}
