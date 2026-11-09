import EnlaceMenu from './EnlaceMenu.jsx'

// Menú inferior de navegación (semana 1)
export default function MenuInferior() {
  return (
    <footer className="bg-slate-900">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <EnlaceMenu to="/" end variante="oscuro">Inicio</EnlaceMenu>
          <EnlaceMenu to="/quienes-somos" variante="oscuro">Quiénes somos</EnlaceMenu>
          <EnlaceMenu to="/contactanos" variante="oscuro">Contáctanos</EnlaceMenu>
        </div>
        <p className="text-xs text-slate-400">© 2026 FrescoMarket · Desarrollo Frontend II (PFY2202)</p>
      </nav>
    </footer>
  )
}
