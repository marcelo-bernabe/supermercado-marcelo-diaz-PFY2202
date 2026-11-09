import { CATEGORIAS } from '../data/productosIniciales.js'

// Botones de filtro por categoría (semana 3)
export default function FiltroCategoria({ seleccionada, onCambiar, conteos }) {
  const opciones = ['Todas', ...CATEGORIAS]
  return (
    <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {opciones.map((categoria) => {
        const activa = categoria === seleccionada
        return (
          <button
            key={categoria}
            type="button"
            onClick={() => onCambiar(categoria)}
            aria-pressed={activa}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              activa
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-500'
            }`}
          >
            {categoria}
            <span className={`ml-1.5 text-xs ${activa ? 'text-emerald-100' : 'text-slate-400'}`}>
              ({conteos[categoria] ?? 0})
            </span>
          </button>
        )
      })}
    </div>
  )
}
